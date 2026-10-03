import { useEffect, useRef } from 'react';
import './DataLine.css';

/**
 * DataLine — ONE continuous, open SVG <path> that travels the whole homepage.
 *
 *   tangled thread (Hero) → unwinds → Linked List / Array / BST → Five Units
 *   → Core Features → Mindmaps → Flashcards → Visualizers → Final CTA
 *
 * The geometry below is authored in a 1000 × 8000 design space (x = % of width × 10,
 * y = % of page height × 80). At runtime the SAME single `d` is scaled once to the
 * host's real pixel size, so the stroke stays a uniform width on every screen.
 *
 * Scroll behaviour: stroke-dashoffset is written directly from the scroll position.
 * No spring, no rAF loop, no timers → it cannot drift or "catch up" after you stop.
 */

const VB_W = 1000;
const VB_H = 8000;

// Single path: exactly one "M", never closed (no "Z"), never returns to its start.
export const DATA_LINE_D = `
M544 554
C544 556 545 564 545 570
C544 575 543 581 541 586
C538 591 535 596 532 601
C528 605 523 609 518 613
C513 616 507 619 501 622
C494 624 487 625 481 626
C474 626 466 626 459 625
C452 623 445 621 439 619
C432 616 426 612 420 608
C414 603 409 598 404 593
C400 588 396 581 393 575
C390 569 388 562 386 556
C385 550 384 543 385 537
C385 530 386 524 389 518
C391 513 396 508 400 503
C403 499 407 496 411 493
C414 490 418 488 420 487
C423 486 426 485 427 485
C429 485 430 485 431 486
C431 487 431 488 430 489
C429 491 427 492 425 494
C423 495 420 497 416 499
C413 500 409 501 405 502
C401 503 397 504 393 505
C389 505 384 505 381 504
C377 504 373 502 370 501
C367 499 365 497 363 494
C361 492 360 488 360 485
C360 481 361 477 363 473
C365 468 368 464 372 459
C376 454 381 449 387 444
C393 439 400 434 408 430
C415 425 424 420 433 416
C443 412 453 409 463 406
C473 403 484 400 495 399
C506 397 517 396 528 396
C539 396 550 397 561 399
C572 401 583 404 593 407
C604 411 614 416 623 422
C633 427 642 434 650 441
C659 449 667 457 675 466
C682 475 689 485 696 496
C703 506 709 517 714 528
C720 539 725 551 730 562
C735 574 740 586 744 597
C748 609 752 620 756 631
C760 642 763 653 766 663
C769 673 772 683 775 691
C777 700 779 708 781 715
C782 721 783 728 784 732
C784 737 784 741 784 744
C783 747 781 748 779 749
C776 750 773 749 768 747
C764 745 758 743 752 739
C745 735 737 730 728 724
C719 719 709 712 698 704
C686 697 674 688 660 680
C646 671 631 661 616 651
C600 641 584 631 567 620
C550 610 532 598 514 588
C497 577 478 565 460 554
C442 543 424 532 407 522
C390 511 373 500 357 490
C341 480 326 471 312 461
C298 452 285 444 274 435
C263 427 253 420 246 413
C238 406 232 400 227 395
C223 389 220 384 220 381
C219 377 220 374 223 371
C225 369 230 368 236 367
C242 366 249 366 258 367
C266 368 276 370 287 373
C298 375 310 379 322 383
C334 387 347 392 360 397
C373 403 386 409 399 416
C413 423 426 431 439 439
C452 447 464 456 476 465
C489 474 500 484 511 494
C522 504 533 515 543 525
C553 536 562 547 570 558
C579 569 587 580 594 591
C602 602 609 613 616 623
C622 634 628 644 634 654
C640 664 645 674 651 683
C656 692 661 701 666 709
C671 717 676 724 681 730
C686 737 690 742 695 747
C710 762 639 884 690 1060
C728 1143 900 1250 900 1450
C900 1650 545 1775 395 1975
C245 2175 110 2300 110 2500
C110 2600 350 2700 550 2850
C750 3000 900 3200 900 3400
C900 3600 670 3650 520 3850
C370 4050 150 4100 150 4300
C150 4450 880 4500 880 4650
C880 4800 750 4850 600 5000
C450 5150 110 5200 110 5350
C110 5450 355 5550 505 5650
C655 5750 900 5850 900 5950
C900 6050 655 6175 505 6275
C355 6375 110 6500 110 6600
C110 6700 345 6800 495 6900
C645 7000 880 7100 880 7200
C880 7275 765 7325 565 7400
C365 7475 250 7525 250 7600
C250 7675 340 7775 440 7775
`;

const SAMPLES = 420; // lookup resolution (piecewise-linear → continuous motion)
const TANGLE_WEIGHT = 0.12; // lets the looping knot draw steadily while its y is not advancing

const scalePath = (d: string, sx: number, sy: number) => {
  let i = 0;
  return d.replace(/\n/g, '').replace(/-?\d+(?:\.\d+)?/g, (n) => (+n * (i++ % 2 ? sy : sx)).toFixed(1));
};

export default function DataLine({ className = '' }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const box = boxRef.current!;
    const svg = svgRef.current!;
    const path = pathRef.current!;
    const lens = new Float64Array(SAMPLES + 1);
    const keys = new Float64Array(SAMPLES + 1);
    let len = 0, top = 0, height = 0, w0 = 0, h0 = 0, sy0 = 0, lastOff = NaN, lastVis = -1;

    // Map scroll → how much of the path is drawn. `keys` is strictly increasing
    // (running-max y + a little arc length), so the drawn head follows the viewport
    // down the page and never jumps while crossing the looping tangle.
    const apply = () => {
      if (!len) return;
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / Math.max(1, height - window.innerHeight)));
      const k = keys[0] + p * (keys[SAMPLES] - keys[0]);
      let lo = 0, hi = SAMPLES;
      while (hi - lo > 1) {
        const m = (lo + hi) >> 1;
        if (keys[m] <= k) lo = m; else hi = m;
      }
      const f = keys[hi] > keys[lo] ? (k - keys[lo]) / (keys[hi] - keys[lo]) : 0;
      const drawn = lens[lo] + f * (lens[hi] - lens[lo]);
      const off = len - drawn;
      if (off !== lastOff) { lastOff = off; path.style.strokeDashoffset = String(off); }
      const vis = drawn > 0.5 ? 1 : 0; // avoid a stray round-cap dot at progress 0
      if (vis !== lastVis) { lastVis = vis; path.style.visibility = vis ? 'visible' : 'hidden'; }
    };

    const measure = () => {
      const r = box.getBoundingClientRect();
      const w = Math.round(r.width), h = Math.round(r.height);
      top = r.top + window.scrollY;
      
      let sy = h / VB_H;
      let mobileAdjustedD = DATA_LINE_D;
      
      const ctaCircle = document.getElementById('cta-circle');
      if (ctaCircle) {
        const ctaRect = ctaCircle.getBoundingClientRect();
        // Calculate y coordinate of the vertical center of the CTA circle relative to the DataLine box
        const ctaY = ctaRect.top + window.scrollY - top + (ctaRect.height / 2); 
        if (ctaY > 0) sy = ctaY / 7775;
        
        // Horizontal exact alignment for mobile (< 768px)
        if (w < 768) {
          const svgTargetX = ctaRect.left / (w / VB_W);
          const shift = svgTargetX - 440;
          mobileAdjustedD = DATA_LINE_D.replace(
            /C250 7675 340 7775 440 7775\s*$/,
            `C${(250 + shift * 0.5).toFixed(1)} 7675 ${(340 + shift * 0.8).toFixed(1)} 7775 ${svgTargetX.toFixed(1)} 7775`
          );
        }
      }
      
      if (!w || !h || (w === w0 && h === h0 && Math.abs(sy - sy0) < 0.001)) return apply();
      
      w0 = w; h0 = h; sy0 = sy; height = h;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      path.setAttribute('d', scalePath(mobileAdjustedD, w / VB_W, sy));
      len = path.getTotalLength();
      path.style.strokeDasharray = `${len} ${len}`;
      let maxY = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const l = (len * i) / SAMPLES;
        maxY = Math.max(maxY, path.getPointAtLength(l).y);
        lens[i] = l;
        keys[i] = maxY + TANGLE_WEIGHT * l;
      }
      lastOff = NaN;
      apply();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(box);
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('load', measure);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', apply);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <div ref={boxRef} className={`data-line ${className}`} aria-hidden="true">
      <svg ref={svgRef} focusable="false" preserveAspectRatio="none">
        <path ref={pathRef} />
      </svg>
    </div>
  );
}
