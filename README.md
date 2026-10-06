# Vue 2 Posts CRUD

CRUD app on the [JSONPlaceholder](https://jsonplaceholder.typicode.com) `/posts` resource.
Stack: Vue 2.7 (Vue CLI), Vue Router 3, Vuex 3, Axios, plain CSS.

## Setup

```bash
npm install
npm run serve   # n
npm run build
```

## Features

- List with title + preview, **search by title** and **pagination** (10/page)
- Detail page at `/posts/:id`
- Create (`/posts/new`) and edit (`/posts/:id/edit`) sharing one `PostForm` component
- Delete with a confirmation modal (from list and detail)
- Loading and error states (with retry) for every request, plus **toast** notifications
- Validation: title required (min 3 chars), body required

## Structure

```
src/api/posts.js      Axios instance + one function per endpoint
src/store/index.js    Vuex store: posts, per-request status, toasts
src/components/       PostCard, PostForm, ConfirmModal, ToastList
src/views/            PostList, PostDetail, PostFormView (create + edit)
src/router/index.js   Routes
```

## Decisions

- **Fake writes:** JSONPlaceholder doesn't persist, so the store is the source of truth after create/update/delete.
- **Local ids:** every `POST` returns id `101`, so new posts get their own incrementing id (101, 102, …) and are flagged `local`.
- **Local posts skip the network:** `PUT`/`DELETE` on ids >100 would fail on the fake API, so for `local` posts only the store is updated.
- **Fetch once:** the list is fetched on first visit and cached, so navigating back doesn't wipe local edits. Retry forces a refetch; locally-created posts are preserved when that happens.
- **Detail** reads from the store first and only calls `GET /posts/:id` if the post isn't there (e.g. direct URL load).
- **Status handling** is centralised in one `run()` helper in the store (loading flag, error message, toast), so components stay thin.
- **Route order:** `/posts/new` is declared before `/posts/:id`.
