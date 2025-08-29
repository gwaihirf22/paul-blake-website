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

### Bug #001 - Reading Progress Bar Scroll Event Issue
**Status:** 🟡 **MEDIUM**  
**Created:** January 27, 2025  
**Reporter:** Paul Blake  
**Environment:** Vivaldi Browser, Next.js 14.2.5, macOS 24.5.0  

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

*(No resolved bugs yet)*

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

## 2025-08-29

- Fixed: Desktop blog dropdown spacing and edge overflow
  - Cause: styled-jsx specificity prevented component styles from taking effect consistently.
  - Fix: Added desktop override block in styles/globals.css to enforce dropdown padding, margins, and rounded corners; ensured overflow clipping and slight left nudge off viewport edge.
  - Files: styles/globals.css

- Todo (mobile navbar dropdown)
  - Ensure Blog sub-links are hidden by default in mobile view and only shown when Blog is tapped.
  - Keep Blog aligned with other nav links; arrow rotates when expanded.
  - Center sub-link items; remove extra spacing.
  - Collapse again on second tap and on route change. 

- Fixed: Mobile Blog submenu expansion & spacing
  - Cause: CSS cascade left the submenu present but non-visible and a residual layout gap; hover styles also interfered on mobile.
  - Fix: Switched to container-based show/hide (display/height/visibility toggled) and centered Blog link; removed legacy rules and hover-open on mobile.
  - Files: components/Navbar.js (mobile state toggle, CSS), styles/globals.css (desktop dropdown overrides)

- Cleanup: Removed obsolete dropdown-* rules and consolidated mobile logic; kept a minimal, desktop-only override in globals to avoid styled-jsx precedence issues. Avoided unnecessary !important usage elsewhere. 

### Synopsis: Navbar Dropdown (Desktop + Mobile)

- Root causes:
  - CSS cascade & scoping: Styled‑JSX component styles lost to global anchor hover and other rules with higher precedence; desktop dropdown styles appeared but were overridden at runtime.
  - Mixed interaction models: Hover and click behaviors conflicted on mobile, leaving the submenu present but visually hidden and leaving layout gaps.
  - Residual layout space: The submenu container had space even when visually hidden (opacity/visibility without display/height control).

- Final approach:
  - Desktop: Kept hover interaction; enforced spacing/rounding with a small, targeted override in `styles/globals.css` (no scatter of !important elsewhere).
  - Mobile: Switched to container‑based show/hide (toggle display/height/visibility/overflow), disabled hover‑open on mobile, centered Blog trigger, tightened spacing, and used inline toggles only where needed (divider visibility).

- Lessons:
  - Prefer container‑level show/hide (display/height/overflow) over only opacity/visibility to avoid “ghost” gaps.
  - Keep desktop and mobile interaction models separate; disable hover behaviors under mobile breakpoints.
  - Use globals sparingly to resolve styled‑JSX precedence when necessary; avoid broad !important rules that hinder future changes. 