Site clips, all muted, 1280px wide, H.264, faststart.

Product proof (content/products.ts): dealer.mp4 + dealer.jpg, clinic.webm, School.webm.
Atmosphere (components/ui/Ambient.tsx, screen-blended behind stages): ambient.mp4 (Work hero), cube.mp4 (About hero), nodes.mp4 (LET'S TALK). Generated 2026-10-13 with Higgsfield Seedance 2.0 Mini, 8 s, 16:9; posters are first frames.

Encode with: ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart out.mp4
Poster: ffmpeg -i out.mp4 -frames:v 1 -q:v 4 out.jpg
