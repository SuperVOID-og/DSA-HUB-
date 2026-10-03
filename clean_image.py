from PIL import Image
import numpy as np

img = Image.open('public/assets/hero-origami-linked-list.jpg').convert("RGBA")
data = np.array(img, dtype=np.float32)

r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
brightness = (r + g + b) / 3.0

# Soft thresholding
# Anything above 240 is completely transparent
# Anything below 200 is completely opaque
# In between, it scales linearly
alpha = np.where(brightness > 240, 0,
                 np.where(brightness < 180, 255,
                          255 * (240 - brightness) / (240 - 180)))

data[:, :, 3] = alpha

# Also whiten the background pixels to avoid dark halos when partially transparent
mask = alpha < 255
data[:, :, 0][mask] = 255
data[:, :, 1][mask] = 255
data[:, :, 2][mask] = 255

img2 = Image.fromarray(data.astype(np.uint8))
img2.save('public/assets/hero-origami-transparent-clean.png')
print("Image cleaned softly.")
