from PIL import Image
import numpy as np

img = Image.open('public/assets/hero-origami-linked-list.jpg').convert("RGBA")
data = np.array(img)

h, w = data.shape[:2]
visited = np.zeros((h, w), dtype=bool)

# Flood fill from corners
stack = [(0,0), (0, w-1), (h-1, 0), (h-1, w-1)]
for sx, sy in stack:
    if visited[sx, sy]: continue
    
    # Simple BFS
    q = [(sx, sy)]
    visited[sx, sy] = True
    
    while q:
        x, y = q.pop()
        
        # Check if it's "background" (light colored)
        r, g, b = data[x, y, :3]
        if r > 210 and g > 210 and b > 210:
            data[x, y, 3] = 0 # Make transparent
            
            # Add neighbors
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = x+dx, y+dy
                if 0 <= nx < h and 0 <= ny < w and not visited[nx, ny]:
                    visited[nx, ny] = True
                    q.append((nx, ny))

img2 = Image.fromarray(data)
img2.save('public/assets/hero-origami-transparent-clean2.png')
print("Done")
