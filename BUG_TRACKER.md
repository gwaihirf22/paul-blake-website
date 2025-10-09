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

*No active bugs at this time.*

---

## Resolved Bugs

### Bug #004 - Mobile Navbar Dropdown Items Off-Center ✅
**Status:** ✅ **RESOLVED**
**Created:** October 9, 2025
**Resolved:** October 9, 2025
**Reporter:** Paul Blake
**Environment:** iOS 26 Vivaldi, Safari, Mobile browsers

**Description:**
Mobile navigation dropdown items (white text) were left-aligned and shifted toward screen edges, while top-level navigation buttons (blue text like "Blog▼" and "Projects▼") remained perfectly centered.

**Expected Behavior:**
- Dropdown items should center horizontally like top-level nav buttons
- Dropdown items should maintain consistent centering across all mobile viewport sizes
- Both top-level buttons and dropdown items should have the same centering behavior

**Actual Behavior:**
- Top-level nav buttons (Home, Blog▼, Projects▼, About) centered correctly ✅
- Dropdown items (All Blog Posts, Technology & Development, etc.) left-aligned and edge-aligned ❌
- Adding `text-align: center` only centered text *inside* containers, not the containers themselves
- Viewport changes caused dropdown items to shift and align with screen edges

**Root Cause:**
Parent containers (`.nav-dropdown` and `.dropdown-menu`) had `width: 100%` constraints in mobile media queries. This forced the containers to span edge-to-edge, preventing them from centering naturally like the top-level buttons which had no width constraints.

**The Problem:**
```css
/* Line 565 - THE CULPRIT */
.navbar-links.open .nav-dropdown {
  width: 100%; /* ❌ Forced edge-to-edge width */
}

/* Line 579 - ALSO PROBLEMATIC */
.dropdown-menu {
  width: 100%; /* ❌ Prevented natural centering */
}
```

**Solution:**
Removed `width: 100%` constraint from `.nav-dropdown` and changed `.dropdown-menu` to use natural sizing with centering:

```css
/* Line 565 - FIXED */
.navbar-links.open .nav-dropdown {
  align-self: center;
  text-align: center;
  /* width: 100%; ✅ REMOVED */
}

/* Line 579 - FIXED */
.dropdown-menu {
  width: auto; /* ✅ Natural sizing */
  max-width: calc(100vw - 2rem); /* Prevent overflow */
  margin: 0 auto; /* ✅ Center the container */
}
```

**Files Changed:**
- `components/Navbar.js` (lines 565, 579, 587)

**Why This Was Hard to Debug:**
1. **Styles scattered across component**: Mobile media query styles were embedded in styled-jsx, making it hard to see all related styles together
2. **Mental model mismatch**: Kept adding centering properties instead of removing width constraints
3. **Red herring solutions**: `text-align: center` did *something* (centered text inside boxes), making it seem like the right approach
4. **Working comparison**: Top-level buttons worked perfectly, so didn't think to compare container-level differences

**Lessons Learned:**
- When CSS centering fails, check parent container width constraints *first* before adding more centering properties
- `width: 100%` on containers prevents natural centering behavior
- Compare what works vs. what doesn't at the container level, not just the element level
- Sometimes the best solution is removing constraining code, not adding more properties

**Testing:**
- ✅ Tested on iOS Safari
- ✅ Tested on iOS Vivaldi
- ✅ Verified across multiple mobile viewport sizes
- ✅ Confirmed dropdown items now center like top-level nav buttons

**Blog Post:**
Detailed debugging story and junior developer explanation published at: `/blog/technology/debugging-mobile-navbar-centering-bug`

---

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