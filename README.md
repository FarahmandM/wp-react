# wp-react

[![npm version](https://img.shields.io/npm/v/wp-react)](https://www.npmjs.com/package/wp-react)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  

> A modern, fully-typed React toolkit for building applications powered by the WordPress REST and GraphQL APIs.

`wp-react` is a hook-driven React integration for WordPress. It handles authentication (JWT/OAuth), data fetching, media, menus, and secure HTML rendering, with deep integration into React Query and optional OpenTelemetry tracing.

---

## ✨ Features

* 🪝 **React Hooks:** Easy-to-use hooks for posts, pages, users, media, categories, and GraphQL.
* 🔐 **Authentication:** Built-in JWT Auth with automatic token refreshing and OAuth support.
* ⚙️ **Configurable:** Flexible REST/GraphQL endpoints via Providers or Environment Variables.
* 📦 **React Query:** Zero-config React Query provider with SSR hydration support.
* 🛡️ **Security:** Secure HTML rendering via DOMPurify to prevent XSS.
* 🧰 **CLI Tool:** Bootstrap your project, test endpoints, and validate authentication from the terminal.
* 🧪 **TypeScript:** Strong, fully exported TypeScript types throughout.

---

## 📦 Installation

```bash
# Using npm:
npm install wp-react

# Using yarn:
yarn add wp-react

# Using pnpm:
pnpm add wp-react
```

---

## 🏗️ Complete Working Example (Zero Guesswork)

Here is exactly how to set up a project from scratch. 

### Step 1: Create your `.env` file
Create a `.env` file in the root of your React project. This file is used by the `wp-react-cli` tool to test your connection, and acts as a fallback for your React app.

```env
REACT_APP_WP_REST_URL=https://demo.wp-api.org/wp-json
REACT_APP_JWT_AUTH_URL=https://demo.wp-api.org/wp-json/jwt-auth/v1/token
```

### Step 2: Wrap your App with Providers
In your main entry file (e.g., `App.tsx`), wrap your application with the providers. 
*Note: Because we have a `.env` file, we don't even need to pass the `config` prop! The provider will read the `.env` automatically.*

```tsx
import React from 'react';
import { WpConfigProvider, WpAuthProvider, ReactQueryProvider } from 'wp-react';
import { BlogFeed } from './BlogFeed';

const App = () => (
    <ReactQueryProvider>
        {/* loadEnvDefaults is true by default, so it reads your .env file automatically! */}
        <WpConfigProvider>
            <WpAuthProvider>
                <BlogFeed />
            </WpAuthProvider>
        </WpConfigProvider>
    </ReactQueryProvider>
);

export default App;
```

### Step 3: Fetch Data using Hooks
Create a component to fetch and display your WordPress data.

```tsx
// BlogFeed.tsx
import { usePosts } from 'wp-react';

export const BlogFeed = () => {
    const { posts, isLoading, error } = usePosts({ per_page: 5 });

    if (isLoading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {posts.map(post => (
                <article key={post.id}>
                    <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </article>
            ))}
        </div>
    );
};
```

---

## 🤔 Configuration: `.env` vs `WpConfigProvider`

You might wonder: *"If I pass the `config` prop directly to `WpConfigProvider`, do I still need a `.env` file?"*

* **For the React App:** No. If you hardcode the URLs in the `config` prop, your React app will work perfectly without a `.env` file.
* **For the CLI Tool:** Yes. The `wp-react-cli` commands (`check`, `login`) rely entirely on the `.env` file to know which URLs to test.
* **How they work together:** If you *do* have a `.env` file, `WpConfigProvider` will automatically read it as a fallback. If you pass a `config` prop, it overrides the `.env` values.

**Option A: Zero-Config (Recommended)**
Rely on the `.env` file. The CLI works out of the box, and your React app reads it automatically.
```tsx
<WpConfigProvider> {/* Reads .env automatically */}
    <YourApp />
</WpConfigProvider>
```

**Option B: Hardcoded Config**
Pass the URLs directly. Great for testing, but the CLI tool won't have a `.env` file to read.
```tsx
<WpConfigProvider config={{ restUrl: 'https://my-site.com/wp-json' }}>
    <YourApp />
</WpConfigProvider>
```

---

## 🧰 CLI Tool

The package includes a CLI (`wp-react-cli`) to help you configure and test your WordPress connection. It relies on your `.env` file.

```bash
# Bootstrap your .env file with an interactive prompt (remembers your previous answers!)
npx wp-react-cli init

# Test JWT or OAuth login from the terminal
npx wp-react-cli login

# Validate that your REST, GraphQL, and Auth URLs are reachable
npx wp-react-cli check
```

---

## 🧩 Usage Examples

### 🔐 Logging In

```tsx
import { useAuth } from 'wp-react';

const Login = () => {
    const { login, logout, user, error, isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await login({ 
            username: formData.get('username') as string, 
            password: formData.get('password') as string 
        });
    };

    if (isAuthenticated) {
        return (
            <div>
                <p>Welcome, {user?.name}!</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    );
};
```

### 🖼️ Displaying Media & Menus

```tsx
import { useMedia, WpMenu, WpImage } from 'wp-react';

const Header = () => (
    <header>
        {/* Fetches and renders a WordPress menu by location */}
        <WpMenu location="primary-menu" className="main-nav" />
    </header>
);

const Gallery = () => {
    const { data: media, isLoading } = useMedia({ per_page: 12 });
    
    if (isLoading) return <p>Loading gallery...</p>;

    return (
        <div className="grid">
            {media?.map(m => (
                <WpImage 
                    key={m.id} 
                    image={m} 
                    className="gallery-item" 
                />
            ))}
        </div>
    );
};
```

---

## 🔌 API Reference  

### Providers  

| Component | Props | Description |  
|-----------|-------|-------------|  
| `WpConfigProvider` | `config?: Partial<WpConfig>`, `loadEnvDefaults?: boolean` | Sets API endpoints. Reads `.env` automatically if `loadEnvDefaults` is true. |  
| `WpAuthProvider` | `children: ReactNode` | Manages JWT authentication state and token refreshing. |  
| `ReactQueryProvider` | `dehydratedState?: DehydratedState`, `enableDevtools?: boolean` | Wraps the app in React Query with SSR hydration support. |

### Hooks  

| Hook | Arguments | Returns | Description |  
|------|-----------|---------|-------------|  
| `usePosts` | `params?: object` | `{ posts, totalPages, totalItems, isLoading, error, refetch }` | Fetches posts with pagination headers. |  
| `usePost` | `id: number` | `UseQueryResult<WpPost>` | Fetches a single post by ID. |  
| `usePages` | `params?: object` | `UseQueryResult<WpPost[]>` | Fetches WordPress pages. |  
| `useCategories` | `params?: object` | `{ categories, isLoading, error, refetch }` | Fetches categories. |  
| `useUser` | `id: number` | `{ user, isLoading, error, refetch }` | Fetches a user by ID. |  
| `useMedia` | `params?: object` | `UseQueryResult<WpMedia[]>` | Fetches media library items. |  
| `useAuth` | - | `{ user, login, logout, refreshToken, error, isAuthenticated }` | Handles authentication state and actions. |  
| `useGraphQLPosts` | - | `UseQueryResult<WpGraphQLPost[]>` | Fetches posts via WPGraphQL. |
| `useApiClient` | - | `WpRestClient` | Returns an Axios instance with auth interceptors attached. |

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `WpPost` | `post: WpPost`, `className?`, `onPostLoaded?` | Renders post title and content with DOMPurify sanitization. |
| `WpMenu` | `location: string`, `className?` | Fetches and renders a WordPress menu by its theme location. |
| `WpImage` | `image: WpMedia`, `className?`, `sizes?` | Renders an image with sanitized caption support. |
| `ErrorBoundary` | `fallback: ReactNode` | Catches rendering errors in child components. |

---

## ⚙️ Environment Variables Reference

If you are using the `.env` approach, these are the supported variables:

```env
# Required for REST API
REACT_APP_WP_REST_URL=https://your-wp-site.com/wp-json

# Optional for GraphQL
REACT_APP_WP_GRAPHQL_URL=https://your-wp-site.com/graphql

# Required for JWT Authentication (Must include the full /token path for the CLI)
REACT_APP_JWT_AUTH_URL=https://your-wp-site.com/wp-json/jwt-auth/v1/token
REACT_APP_JWT_REFRESH_URL=https://your-wp-site.com/wp-json/jwt-auth/v1/token/refresh

# Optional: Cache TTL in milliseconds (Default: 300000 / 5 mins)
REACT_APP_CACHE_TTL=300000
```

---

## 🛠 Development & Contributing

Want to contribute? Check out our [Contributing Guidelines](CONTRIBUTING.md) to learn how to set up the project, run tests, and submit a Pull Request.

---

## 📜 License  
MIT © 2018-2026 [Farahmand Moslemi](https://github.com/FarahmandM)