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