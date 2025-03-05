// This file can be imported in app.js to add more advanced interactive features

/**
 * Create a draggable widget system
 * This function should be called after the dashboard renders
 */
export function enableWidgetDragging() {
  // Get all widget elements
  const widgets = document.querySelectorAll('.widget-card');
  
  widgets.forEach(widget => {
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    
    // Set initial positioning for transform
    widget.style.position = 'relative';
    widget.style.zIndex = '1';
    widget.style.cursor = 'grab';
    
    widget.addEventListener('mousedown', (e) => {
      isDragging = true;
      offset = { 
        x: e.clientX - widget.getBoundingClientRect().left,
        y: e.clientY - widget.getBoundingClientRect().top
      };
      widget.style.zIndex = '100';
      widget.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      
      widget.style.position = 'absolute';
      widget.style.left = `${x}px`;
      widget.style.top = `${y}px`;
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        widget.style.zIndex = '1';
        widget.style.cursor = 'grab';
      }
    });
  });
}

/**
 * Make widgets collapsible by adding a collapse/expand button
 */
export function makeWidgetsCollapsible() {
  const widgets = document.querySelectorAll('.widget-card');
  
  widgets.forEach(widget => {
    const header = widget.querySelector('h3, div:first-child');
    const content = Array.from(widget.children).filter(el => el !== header);
    
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '−';
    toggleButton.className = 'ml-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm';
    
    header.appendChild(toggleButton);
    
    let isCollapsed = false;
    
    toggleButton.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      
      content.forEach(el => {
        el.style.display = isCollapsed ? 'none' : '';
      });
      
      toggleButton.innerHTML = isCollapsed ? '+' : '−';
      
      if (isCollapsed) {
        widget.style.minHeight = 'auto';
      }
    });
  });
}
