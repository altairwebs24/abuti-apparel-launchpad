<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use five public editorial routes and one public administration route with inline sign-in; the shared shell lives in the root to keep navigation consistent.
- Catalog reads use a public server function with the publishable client; all product mutations use authenticated server functions and database admin-role policies so direct calls remain protected.
- App-owned Cloud authentication middleware prefers runtime configuration and falls back to build-time public connection values, verifying bearer tokens with Cloud before RLS-scoped queries so external hosts need no private credentials for catalog administration.
- Product detail routes share the catalog query and a reusable detail view; the bag is browser-local only until a payment provider is configured, avoiding simulated checkout.
- The homepage collection reuses the public catalog cache and selects the latest four published products; isolate its loading and errors so the editorial homepage stays available.
- Keep catalog error and not-found boundaries in the critical route bundle; shared root/router recovery reloads cached failed module imports so a missing lazy chunk cannot also prevent recovery.
- Store administrator roles in user_roles and assign them through trusted owner operations only; self-registration never grants editing access.
- Use immutable CDN asset pointers for provided brand media and the public Cloud bucket for administrator product uploads, keeping both available on external deployments.
- Keep the catalog empty until the owner adds products; do not synthesize checkout payments or contact delivery without a configured provider.
- Prebundle React, its renderer, JSX runtimes, and Radix Slot together in Vite to prevent late dependency discovery from mixing React cache generations in the preview.
