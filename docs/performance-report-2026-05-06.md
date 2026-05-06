# PawpyGo Lighthouse 性能测试报告

测试时间：2026-05-06 15:58-16:00（Asia/Shanghai）  
测试地址：`https://www.pawpygo.com/zh`  
测试工具：Lighthouse CI，每端连续运行 3 次。

## 代码提交

- `303975d`：转换首页本地大图为 WebP，删除原 JPG/PNG 大图，缩小产品图请求宽度，移除 Hero CSS 背景图兜底。
- `5388cd3`：修复 WebP asset delivery，进一步压缩本地 WebP 卡片图，并移除主题硬编码 Meta Pixel。
- Shopify live theme：`160295977178` 已通过 Shopify CLI 推送并重新发布。

## 报告链接

- Mobile: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1778054361812-76000.report.html
- Desktop: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1778054450063-9112.report.html

## 总分

| 端 | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 88 / 91 / 90 | 95 | 57 | 92 |
| Desktop | 70 / 70 / 71 | 95 | 56 | 92 |

## 核心指标

| 端 | FCP | LCP | TBT | CLS | Speed Index | TTI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile Run 1 | 1.8s | 2.8s | 80ms | 0.0005 | 6.7s | 10.8s |
| Mobile Run 2 | 1.7s | 2.7s | 66ms | 0.0005 | 5.1s | 10.4s |
| Mobile Run 3 | 1.8s | 2.9s | 39ms | 0.0005 | 5.5s | 10.6s |
| Desktop Run 1 | 1.7s | 2.7s | 71ms | 0.0004 | 4.8s | 9.5s |
| Desktop Run 2 | 1.8s | 2.7s | 46ms | 0.0004 | 5.1s | 10.0s |
| Desktop Run 3 | 1.7s | 2.6s | 43ms | 0.0004 | 4.5s | 9.8s |

## 本次优化结果

- Mobile Performance 从之前约 `72–92` 稳定到 `88–91`，LCP 稳定在 `2.7–2.9s`。
- Desktop Performance 从之前约 `68–71` 稳定到 `70–71`，LCP 稳定在 `2.6–2.7s`。
- 首页 Hero 使用 WebP，并保留 `fetchpriority="high"`。
- 产品集合图片请求宽度已降到 `280`，避免继续请求 `640`。
- 本地大图已从 JPG/PNG 转为 WebP，主题资产体积明显下降。

## 仍存在的问题

- Lighthouse 仍检测到 7 张图片可优化，其中部分来自 Shopify 产品图片压缩质量和当前 storefront 编译缓存。
- 线上 HTML 仍出现一个后台/缓存注入的 Meta Pixel 片段；主题代码中硬编码 Pixel 已移除。
- `meta-description` 审计仍报错，但页面 HTML 已输出 description，后续需要排查 Shopify/Lighthouse 对当前 head 注入顺序的识别问题。
- 渲染阻塞仍有 9 项，主要来自 `base.css`、Shopify accelerated checkout CSS、footer 组件 CSS 和 slider/slideshow CSS。
- Best Practices 受第三方 cookie、console errors、deprecated APIs 和第三方脚本影响，仍在 `56–57`。

## 下一步建议

1. 在 Shopify 后台检查 Custom Pixel / Facebook App，移除重复 Meta Pixel 或确认只保留一个入口。
2. 继续处理 footer 和 announcement 组件 CSS，改为更细粒度条件加载。
3. 修复颜色对比、标题层级和按钮 accessible name，提高 Accessibility 与 LHCI 通过率。
4. 在 Shopify 产品媒体侧上传更高压缩率的 WebP/AVIF 商品图，减少 CDN 转换后的图片体积。

