# Visual Regression Tester

## Steup

```bash
pnpm i
```

## Configuration

create `vrt.config.json` in the root of your project

```json
{
  "baseUrl": "https://web-speed-hackathon-2023.pages.dev",
  "waitUntil": "networkidle",
  "paths": [
    {
      "path": "/",
      "name": "top"
    }
  ],
  "viewports": [
    {
      "name": "Pixel 5",
      "width": 393,
      "height": 851
    },
    {
      "name": "Kindle Fire HDX",
      "width": 800,
      "height": 1280
    },
    {
      "name": "Desktop",
      "width": 1280,
      "height": 720
    }
  ]
}
```

## Usage

```bash
pnpm capture
```

move the captured images which are located in `actual` to `expected` if you want to update the expected images.

```bash
pnpm vrt
```

And if you want to reset the captured images, you can run the following command.

```bash
pnpm clean
```

After the expected images are updated, you can re-run the test more easily.

```bash
pnpm start
```
