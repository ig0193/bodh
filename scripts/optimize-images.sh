#!/bin/bash

# Image Optimization Script for Hindu Calendar App
# This script optimizes images for web use

echo "🖼️  Image Optimization Script"
echo "=============================="

# Create optimized directories
mkdir -p images/temples/optimized
mkdir -p images/temples/thumbnails

# Function to optimize image
optimize_image() {
    local input_file=$1
    local output_file=$2
    local max_size=$3
    
    echo "Optimizing: $input_file"
    
    # Resize and optimize using sips (macOS built-in)
    sips -Z $max_size "$input_file" --out "$output_file"
    
    # Get file sizes
    original_size=$(stat -f%z "$input_file")
    optimized_size=$(stat -f%z "$output_file")
    
    # Calculate reduction
    reduction=$((100 - (optimized_size * 100 / original_size)))
    
    echo "  Original: $(($original_size / 1024))KB"
    echo "  Optimized: $(($optimized_size / 1024))KB"
    echo "  Reduction: ${reduction}%"
    echo ""
}

# Optimize temple images
echo "🏛️  Optimizing Temple Images..."
for img in images/temples/*.jpg images/temples/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        
        # Create optimized version (800px max)
        optimize_image "$img" "images/temples/optimized/${filename}" 800
        
        # Create thumbnail version (300px max)
        optimize_image "$img" "images/temples/thumbnails/${filename}" 300
    fi
done

echo "✅ Image optimization complete!"
echo ""
echo "📁 Optimized images saved to:"
echo "   - images/temples/optimized/ (800px max)"
echo "   - images/temples/thumbnails/ (300px max)"
echo ""
echo "💡 Usage:"
echo "   - Use optimized/ for main display"
echo "   - Use thumbnails/ for previews"
echo "   - Update temple data to use optimized paths"
