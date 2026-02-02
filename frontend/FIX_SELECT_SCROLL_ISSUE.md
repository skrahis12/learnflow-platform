# Fix: Page Scroll Issue on Select Dropdown

## Problem
When clicking on the "All Levels" option (or any option) in the select dropdown on the Courses page, the page was jumping/scrolling to the center.

## Root Cause
The issue was caused by Radix UI's Select component's default behavior. When the dropdown closes after selecting an item, it tries to restore focus to the trigger element, which can cause unwanted scrolling behavior.

## Solution
Added the `onCloseAutoFocus` event handler to the `SelectContent` component to prevent the default auto-focus behavior:

```javascript
<SelectPrimitive.Content 
  ref={ref} 
  className={...}
  position={position} 
  onCloseAutoFocus={(e) => e.preventDefault()}  // ← This prevents the scroll
  {...props}
>
```

## Files Modified
- `src/components/ui/select.jsx` - Added `onCloseAutoFocus` handler to prevent page scroll

## How It Works
The `onCloseAutoFocus` event is triggered when the select dropdown closes. By calling `e.preventDefault()`, we prevent the default focus restoration behavior that was causing the page to scroll.

## Testing
1. Navigate to the Courses page (`/courses`)
2. Click on the "Level" dropdown
3. Select "All Levels" or any other option
4. The page should now stay in place without scrolling

## Impact
- ✅ Fixes the unwanted page scroll when selecting options
- ✅ Maintains all other select functionality
- ✅ Works for all select dropdowns in the application (Category, Level, Sort)
- ✅ No breaking changes to existing functionality
