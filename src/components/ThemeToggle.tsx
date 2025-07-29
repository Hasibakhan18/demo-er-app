/**
 * ThemeToggle.ts
 * Creates a theme toggle button that can be appended to the DOM
 */

// This function creates a button element that can be appended to the buttonContainer
export const createThemeToggleButton = (): HTMLButtonElement => {
  // Create the button element
  const themeToggleBtn = document.createElement("button");

  // Set initial text based on current theme
  const currentTheme = localStorage.getItem("theme") || "light";
  themeToggleBtn.innerHTML = currentTheme === "light" ? "🌙" : "☀️";

  // Apply the same style as other buttons in useJointJS
  themeToggleBtn.style.cssText = `
    width: 32px;
    height: 32px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--button-bg);
    border: 1px solid var(--toolbar-border);
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  `;

  themeToggleBtn.title = `Switch to ${
    currentTheme === "light" ? "dark" : "light"
  } theme`;

  // Add click event listener
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Update theme in localStorage and on document
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    // Update button text
    themeToggleBtn.innerHTML = newTheme === "light" ? "🌙" : "☀️";
    themeToggleBtn.title = `Switch to ${
      newTheme === "light" ? "dark" : "light"
    } theme`;
  });

  return themeToggleBtn;
};
