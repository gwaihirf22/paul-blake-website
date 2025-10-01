# Bug Tracker - Paul Blake Website

## Status Legend
- 🔴 **CRITICAL** - Breaks core functionality
- 🟠 **HIGH** - Significant impact on user experience
- 🟡 **MEDIUM** - Moderate impact, workaround available
- 🟢 **LOW** - Minor issue, cosmetic
- ✅ **RESOLVED** - Fixed and verified
- 🚫 **WONTFIX** - Issue acknowledged but not planned for resolution

---

## Active Bugs

### Bug #003 - Mobile drop down off center
**Status:** ✅ **RESOLVED**  
**Created:** Oct 1, 2025  
**Reporter:** Paul Blake  
**Environment:** IOS 26 Vivaldi, Safari  

**Description:**
Reading progress bar component fails to update in real-time during scrolling. The component can detect scroll position on component update/refresh but scroll event listeners are not firing properly during user scrolling.

**Expected Behavior:**
- Progress bar should update smoothly as user scrolls through blog posts
- Scroll events should trigger the progress calculation function
- Progress percentage should reflect current scroll position in real-time

**Actual Behavior:**
- Progress bar only updates when component re-renders (file changes, page refresh)
- Console shows "SCROLL EVENT FIRED!" never appears
- All scroll detection methods (`window.scrollY`, `document.documentElement.scrollTop`, etc.) remain at 0 during scrolling
- Vivaldi browser shows "Prohibited blocking overflowing/scrolling of the document" warning

**Technical Details:**
- Component: `components/ReadingProgress.js`
- Files affected: `pages/blog/[slug].js`, `pages/blog/theology/[slug].js`
- Current workaround: Polling every 100ms (not industry standard)

**Debugging Attempted:**
1. ✅ Multiple scroll event listeners (window, document, documentElement)
2. ✅ Different scroll position detection methods
3. ✅ Passive event listeners
4. ✅ RequestAnimationFrame for performance
5. ✅ Console logging to verify event firing
6. ✅ Polling approach (works but not optimal)

**Potential Causes:**
- CSS overflow/positioning issues preventing normal document scrolling
- Browser-specific scroll event blocking (Vivaldi interference)
- Next.js static generation affecting client-side scroll detection
- CSS layout preventing scrollable document height

**Current Workaround:**
Implemented polling-based solution that checks scroll position every 100ms. Functional but not performance-optimal.

**Next Steps:**
1. Investigate CSS layout for scroll-preventing rules
2. Test in different browsers (Chrome, Firefox, Safari)
3. Consider Intersection Observer API as alternative
4. Examine document structure and height calculations

**Priority Justification:**
Medium priority - feature works with polling workaround, but not following industry best practices. Should be resolved for performance and code quality.

---

## Resolved Bugs

### Bug #002 - Desktop Blog Dropdown Spacing and Edge Overflow ✅
**Status:** ✅ **RESOLVED**  
**Created:** August 29, 2025  
**Resolved:** August 29, 2025  
**Reporter:** Paul Blake  
**Environment:** Multiple browsers, Next.js 14.2.32, macOS  

### Bug #001 - Reading Progress Bar Scroll Event Issue
**Status:** ✅ **RESOLVED**  
**Created:** July 27, 2025  
**Resolved:** July 29, 2025
**Reporter:** Paul Blake  
**Environment:** Vivaldi Browser, Next.js 14.2.5, macOS 24.5.0  

**Description:**
Desktop blog dropdown menu had incorrect spacing, padding, and would overflow past the viewport edge. styled-jsx component styles were being overridden by global CSS rules.

**Root Cause:**
styled-jsx specificity prevented component styles from taking effect consistently. CSS cascade and scoping issues caused desktop dropdown styles to be overridden at runtime.

**Solution:**
Added desktop override block in `styles/globals.css` to enforce dropdown padding, margins, and rounded corners. Ensured overflow clipping and slight left nudge off viewport edge.

**Files Changed:**
- `styles/globals.css`

---

### Bug #003 - Mobile Blog Submenu Expansion & Spacing ✅
**Status:** ✅ **RESOLVED**  
**Created:** August 29, 2025  
**Resolved:** August 29, 2025  
**Reporter:** Paul Blake  
**Environment:** Mobile browsers, Next.js 14.2.32  

**Description:**
Mobile blog submenu had expansion issues, residual layout gaps, and conflicting hover/click behaviors. Submenu was present but non-visible with spacing problems.

**Root Cause:**
CSS cascade left the submenu present but non-visible with residual layout gap. Hover styles interfered on mobile, and mixed interaction models (hover + click) conflicted.

**Solution:**
- Switched to container-based show/hide (display/height/visibility toggled)
- Centered Blog link and removed legacy rules
- Disabled hover-open behavior on mobile
- Used container-level control instead of opacity-only

**Files Changed:**
- `components/Navbar.js` (mobile state toggle, CSS)
- `styles/globals.css` (desktop dropdown overrides)

**Lessons Learned:**
- Prefer container-level show/hide (display/height/overflow) over opacity/visibility only
- Keep desktop and mobile interaction models separate
- Use globals sparingly to resolve styled-JSX precedence issues

---

## Bug Reporting Template

When reporting a new bug, please use this template:

```markdown
### Bug #XXX - [Brief Description]
**Status:** [🔴/🟠/🟡/🟢]
**Created:** [Date]
**Reporter:** [Name]
**Environment:** [Browser, OS, Version details]

**Description:**
[Clear description of the issue]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Technical Details:**
- Component/File: 
- Browser Console Errors:
- Network Issues:

**Screenshots/Logs:**
[If applicable]
```

---

## Notes
- All bugs should be tested across multiple browsers before marking as resolved
- Include browser console errors and network tab information when relevant
- Reference commit hashes when bugs are introduced or fixed
- Update status regularly as work progresses 

---

## Active Tasks

### Task #001 - Mobile Navbar Dropdown Enhancement
**Status:** 🟡 **PENDING**  
**Created:** August 29, 2025  
**Priority:** MEDIUM  

**Requirements:**
- Ensure Blog sub-links are hidden by default in mobile view and only shown when Blog is tapped
- Keep Blog aligned with other nav links; arrow rotates when expanded
- Center sub-link items; remove extra spacing
- Collapse again on second tap and on route change

**Notes:**
Related to resolved bugs #002 and #003. This is an enhancement task, not a bug fix.

---

## Development Notes

### August 29, 2025 - Navbar Dropdown Fixes

**Summary:** Comprehensive fix for navbar dropdown issues on both desktop and mobile platforms.

**Root Causes Identified:**
1. **CSS cascade & scoping**: Styled-JSX component styles lost to global anchor hover and other rules with higher precedence
2. **Mixed interaction models**: Hover and click behaviors conflicted on mobile
3. **Residual layout space**: Submenu container had space even when visually hidden

**Final Implementation:**
- **Desktop**: Kept hover interaction; enforced spacing/rounding with targeted override in `styles/globals.css`
- **Mobile**: Switched to container-based show/hide; disabled hover-open on mobile; centered Blog trigger

**Files Modified:**
- `components/Navbar.js` - Mobile state toggle and CSS
- `styles/globals.css` - Desktop dropdown overrides

**Best Practices Applied:**
- Container-level show/hide (display/height/overflow) over opacity/visibility only
- Separate desktop and mobile interaction models  
- Minimal global CSS overrides to resolve styled-JSX precedence
- Avoided unnecessary !important usage 