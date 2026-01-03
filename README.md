# Coders Blog - React Blog Application

A modern, responsive blog application built with React that fetches and displays blog posts from an external API. Features include pagination, category/tag filtering, and detailed blog post views.

![React](https://img.shields.io/badge/React-18.2-blue)
![React Router](https://img.shields.io/badge/React_Router-6.14-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blueviolet)
![Vite](https://img.shields.io/badge/Vite-4.4-orange)


## ✨ Features

- 📱 **Responsive Design** - Fully responsive across all device sizes
- 📝 **Blog Listing** - Display blog posts with pagination
- 🔍 **Filtering** - Filter posts by categories and tags
- 📄 **Blog Details** - Detailed view for individual blog posts
- 🔗 **Related Posts** - Automatically shows related blog posts
- ⚡ **Fast Navigation** - Smooth client-side routing with React Router
- 🎨 **Modern UI** - Clean, modern interface with Tailwind CSS
- 📊 **Pagination** - Efficient page navigation with fixed bottom pagination
- 🎯 **Context API** - Global state management with React Context
- 🌙 **Loading States** - Smooth loading spinners and skeleton screens

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Routing**: React Router DOM 7.11.0
- **Styling**: Tailwind CSS 3.3
- **Build Tool**: Vite
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Package Manager**: npm/yarn

## 📁 Project Structure

```
src/
├── components/
│   ├── Blogs.jsx         # Main blog listing component
│   ├── Card.jsx          # Individual blog card component
│   ├── Header.jsx        # Navigation header
│   ├── Pagination.jsx    # Pagination controls
│   └── Spinner.jsx       # Loading spinner
├── pages/
│   ├── Home.jsx          # Homepage
│   ├── BlogPage.jsx      # Single blog post page
│   ├── CategoryPage.jsx  # Category filtered posts
│   └── TagPage.jsx       # Tag filtered posts
├── context/
│   └── AppContext.jsx    # Global state management
├── baseUrl.js            # API configuration
└── App.jsx              # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/coders-blog.git
cd coders-blog
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

The application uses the CodeHelp API by default. You can configure the API endpoint in `baseUrl.js`:

```javascript
export const BASE_URL = "https://codehelp-apis.vercel.app/api/get-blogs";
```

## 📖 Usage

### Blog Features

1. **View All Posts**: Navigate to the homepage to see all blog posts
2. **Filter by Category**: Click on any category tag to view posts in that category
3. **Filter by Tag**: Click on any hashtag to filter posts by that tag
4. **Read Full Post**: Click on any blog card to read the full article
5. **Navigation**: Use the pagination controls at the bottom to navigate between pages
6. **Back Navigation**: Use the "Back" button to return to previous pages

### API Integration

The application fetches data from the CodeHelp API:
- List of blogs: `GET /api/get-blogs`
- Filtering: Supports `page`, `tag`, and `category` parameters

## 🎨 Components Overview

### `Blogs.jsx`
Displays a grid of blog posts with loading and error states.

### `Card.jsx`
Individual blog card component with clickable tags and categories.

### `Pagination.jsx`
Fixed bottom pagination controls with previous/next buttons.

### `BlogPage.jsx`
Detailed view of a single blog post with related posts section.

### `AppContext.jsx`
Global state management for blog data, loading states, and pagination.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: Single column layout
- Tablet: Two column layout
- Desktop: Three column layout

## 🔄 State Management

The app uses React Context API for state management:
- `posts`: Array of blog posts
- `loading`: Loading state
- `error`: Error messages
- `page`: Current page number
- `totalPages`: Total number of pages
- `fetchBlogPosts`: Function to fetch blog data
- `handlePageChange`: Function to handle pagination

## 🧪 Testing

To run tests (if applicable):
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CodeHelp API](https://codehelp-apis.vercel.app/) for providing the blog data
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 📞 Contact

Project Link: [https://github.com/rubaiyatxeren/Coders-Blog---React-Blog-Application]

---

Made with ❤️ by eRubaiyat
