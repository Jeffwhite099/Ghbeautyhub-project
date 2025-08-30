# 🎨 Logo Guide - GH Beauty Hub

This guide explains how to use the different logo variants throughout the GH Beauty Hub application.

## 📁 Logo Files

### 1. **Main Logo** (`/public/logo.svg`)
- **Size**: 200x60px
- **Use**: Navigation bar, mobile drawer, general branding
- **Features**: Full logo with text "GH Beauty Hub" and "Big Gurls Beauty Palour"

### 2. **Hero Logo** (`/public/hero-logo.svg`)
- **Size**: 400x200px
- **Use**: Homepage hero section, large displays
- **Features**: Large logo with tagline "Where Beauty Meets Excellence"

### 3. **Favicon** (`/public/favicon.svg`)
- **Size**: 32x32px
- **Use**: Browser tab icon, bookmarks
- **Features**: Simplified icon version for small spaces

### 4. **Icon Logo** (`/public/logo-icon.svg`)
- **Size**: 48x48px
- **Use**: Loading states, small spaces, app icons
- **Features**: Icon-only version without text

## 🚀 Usage in Components

### Logo Component
```jsx
import Logo from '../components/common/Logo';

// Different variants
<Logo variant="default" size="medium" />     // Main logo
<Logo variant="hero" size="large" />         // Hero logo
<Logo variant="icon" size="small" />         // Icon only
<Logo variant="favicon" size="small" />      // Favicon version
```

### Size Options
- **`small`**: 30px height
- **`medium`**: 40px height (default)
- **`large`**: 60px height

### Variant Options
- **`default`**: Main logo with text
- **`hero`**: Large hero logo with tagline
- **`icon`**: Icon-only version
- **`favicon`**: Small favicon version

## 🎯 Where Logos Are Used

### 1. **Navigation Bar**
- Main logo in the top-left corner
- Responsive sizing for mobile/desktop

### 2. **Mobile Drawer**
- Large logo in the mobile menu header
- Centered for better mobile UX

### 3. **Homepage Hero**
- Hero logo prominently displayed
- Sets the brand tone for visitors

### 4. **Footer**
- Medium logo in the salon info section
- Maintains brand consistency

### 5. **Browser Tab**
- Favicon for easy identification
- Apple touch icon for mobile devices

## 🎨 Design Features

### Color Scheme
- **Primary**: Pink (#e91e63)
- **Secondary**: Purple (#9c27b0)
- **Gradients**: Smooth transitions between colors
- **White accents**: Clean, professional look

### Design Elements
- **Mirror symbol**: Represents beauty and reflection
- **Beauty tools**: Lipstick, mascara, nail polish
- **Modern typography**: Clean, readable fonts
- **Responsive design**: Scales well on all devices

## 🔧 Customization

### Changing Colors
Edit the SVG files to modify:
- Gradient colors in `<defs>` section
- Fill colors for specific elements
- Stroke colors for borders

### Adding New Variants
1. Create new SVG file in `/public/`
2. Add case to `getLogoSrc()` function in Logo component
3. Update size handling if needed

### Responsive Behavior
- Logos automatically scale with container
- Use `maxWidth` and `maxHeight` for constraints
- Mobile-first design approach

## 📱 Mobile Optimization

- SVG format ensures crisp display at all sizes
- Optimized file sizes for fast loading
- Touch-friendly sizing for mobile devices
- Responsive breakpoints for different screen sizes

## 🌐 Hosting Considerations

- All logos are in SVG format for scalability
- No external dependencies required
- Optimized for web performance
- Works with all modern hosting platforms

---

**Note**: All logo files are optimized for web use and include proper alt text for accessibility. The SVG format ensures the logos look crisp at any size and load quickly.
