# 🖼️ Image Guidelines for Hindu Calendar App

## 📏 **Recommended Image Sizes**

### **Temple Images:**
- **Main Display**: 800px width, max 300KB
- **Thumbnails**: 300px width, max 100KB
- **Mobile Optimized**: 600px width, max 200KB

### **Format Guidelines:**
- **Primary**: JPEG (.jpg) for photos
- **Secondary**: PNG (.png) for graphics with transparency
- **Modern**: WebP (.webp) for better compression (if supported)

## 🚀 **Optimization Process**

### **1. Before Adding Images:**
```bash
# Run the optimization script
./scripts/optimize-images.sh
```

### **2. Manual Optimization (macOS):**
```bash
# Resize to 800px max width
sips -Z 800 original.jpg --out optimized.jpg

# Check file size
ls -lh optimized.jpg
```

### **3. Online Tools:**
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: Desktop app for macOS

## 📁 **File Structure**

```
images/
├── temples/
│   ├── optimized/          # 800px max, main display
│   ├── thumbnails/         # 300px max, previews
│   └── original/           # Keep original files
├── festivals/              # Future use
└── icons/                  # Small icons and graphics
```

## ⚡ **Performance Targets**

### **Page Load Speed:**
- **Total Images**: < 500KB per page
- **Individual Image**: < 200KB
- **Loading Time**: < 2 seconds on 3G

### **Mobile Optimization:**
- **Progressive Loading**: Images load as user scrolls
- **Lazy Loading**: Only load visible images
- **Responsive Images**: Different sizes for different devices

## 🎯 **Best Practices**

### **1. Image Naming:**
```
temple-name_location_size.jpg
Example: kedarnath_uttarakhand_800.jpg
```

### **2. Alt Text:**
- Always include descriptive alt text
- Include temple name and location
- Example: "Kedarnath Temple in Uttarakhand, India"

### **3. Quality vs Size:**
- **High Quality**: 80-85% JPEG quality
- **Good Balance**: 70-80% JPEG quality
- **Small Size**: 60-70% JPEG quality

## 🔧 **Technical Implementation**

### **Lazy Loading:**
- Images load only when visible
- Uses Intersection Observer API
- Improves initial page load speed

### **Fallback Handling:**
- Graceful degradation for failed images
- Placeholder with temple icon
- Error logging for debugging

### **Caching Strategy:**
- Browser caching for static images
- Service worker for offline access
- CDN ready for future deployment

## 📊 **Size Comparison**

| Image Type | Original | Optimized | Reduction |
|------------|----------|-----------|-----------|
| Kedarnath | 1.1MB | 209KB | 81% |
| Target | < 300KB | < 100KB | > 70% |

## 🚨 **Common Issues**

### **1. Large File Sizes:**
- **Problem**: Images > 500KB
- **Solution**: Use optimization script
- **Prevention**: Check size before adding

### **2. Missing Alt Text:**
- **Problem**: Accessibility issues
- **Solution**: Always include descriptive alt text
- **Prevention**: Code review checklist

### **3. Wrong Dimensions:**
- **Problem**: Images too large/small
- **Solution**: Use recommended sizes
- **Prevention**: Follow size guidelines

## 📈 **Monitoring**

### **Performance Metrics:**
- Page load time
- Image loading time
- Total page size
- User experience scores

### **Tools:**
- Chrome DevTools Network tab
- Lighthouse performance audit
- WebPageTest for real-world testing
