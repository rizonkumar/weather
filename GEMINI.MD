* All implementation must be production-grade and aligned with scalable engineering practices.
* Follow SOLID principles, clean architecture, and strong separation of concerns.
* Avoid code duplication entirely; prioritize reusability, composition, and modular design.
* Maintain consistent naming conventions, folder structure, coding standards, and architectural patterns across the entire codebase.
* Keep the codebase extensible, maintainable, and easy to evolve.
* Do not include unnecessary comments in the code.
* Ensure strict type safety, predictable state management, proper error handling, and robust edge-case handling.
* Optimize for performance, readability, developer experience, and long-term maintainability.

Frontend Expectations:

Architecture & Structure:

* Follow a clear and scalable architecture with strict separation of concerns.
* Separate UI, business logic, state management, API communication, and utilities into dedicated layers.
* Components should focus on rendering and user interaction only.
* Business logic must be extracted into reusable services, hooks, composables, stores, or equivalent abstractions.
* Avoid tightly coupled components and cross-layer dependencies.
* Design for scalability, testability, and maintainability from the start.

Components:

* Build small, focused, reusable, and composable components.
* Prefer composition over inheritance.
* Avoid large monolithic components.
* Ensure consistent component APIs and patterns across the application.
* Extract shared functionality into reusable abstractions when used in multiple places.

State Management:

* Keep state localized whenever possible.
* Use global state only when truly necessary.
* Ensure state updates are predictable, traceable, and type-safe.
* Avoid duplicated, derived, or conflicting sources of truth.
* Separate server state from client/UI state when applicable.

Data Fetching & API Integration:

* Centralize API communication through dedicated service layers.
* Do not perform direct API calls throughout the UI layer.
* Implement consistent request handling, error handling, retries, caching, and loading states.
* Normalize and transform API responses before consumption when necessary.
* Keep API contracts strongly typed and predictable.

Validation & Forms:

* Centralize validation logic and schemas.
* Reuse validation rules across forms whenever possible.
* Validate inputs before submission and provide clear user feedback.
* Handle loading, success, validation, and failure states consistently.

Constants & Configuration:

* Store all reusable constants, enums, routes, feature flags, and configuration values in dedicated modules.
* Avoid hardcoded strings, magic values, and duplicated configuration throughout the codebase.
* Use centralized configuration management for environment-specific behavior.

Error Handling:

* Implement consistent error handling across the application.
* Surface actionable and user-friendly messages for recoverable errors.
* Avoid exposing internal implementation details to users.
* Ensure fallback states exist for unexpected failures.
* Log errors with sufficient context for debugging and monitoring.

Security:

* Validate and sanitize all user-provided input.
* Never expose secrets, credentials, or sensitive configuration in client-side code.
* Follow secure authentication and authorization practices.
* Apply least-privilege principles when handling user data and permissions.
* Protect against common frontend security vulnerabilities.

Performance:

* Optimize rendering performance and avoid unnecessary re-renders.
* Implement lazy loading, code splitting, and asset optimization where appropriate.
* Minimize bundle size and unused dependencies.
* Optimize network requests and caching strategies.
* Ensure smooth interactions across devices and network conditions.

Accessibility:

* Follow WCAG accessibility best practices.
* Ensure keyboard navigation support throughout the application.
* Provide proper semantic structure, labels, and ARIA attributes where necessary.
* Maintain sufficient color contrast and accessible interaction patterns.
* Test accessibility as part of the implementation process.

UI/UX Expectations:

* Use only Lucide icons throughout the application.
* The UI must feel modern, polished, responsive, and production-ready across all screen sizes.
* Prioritize usability, accessibility, consistency, and intuitive user flows.
* Maintain strong visual hierarchy, spacing, typography, and interaction feedback.
* Ensure loading, empty, success, and error states are thoughtfully designed.
* Use icons only when they improve clarity and usability.

Testing & Quality:

* Write maintainable and meaningful unit, integration, and end-to-end tests where appropriate.
* Test critical user flows, edge cases, and failure scenarios.
* Avoid brittle tests that depend on implementation details.
* Ensure code is reviewable, predictable, and easy to refactor safely.

Observability:

* Implement structured logging and monitoring where applicable.
* Capture client-side errors and performance metrics.
* Provide sufficient context for debugging and issue investigation.
* Ensure production issues can be traced efficiently.

Quality Expectations:

* No temporary fixes, hacks, dead code, or inconsistent patterns.
* Ensure every implementation is deployment-ready and production-quality.
* Validate responsiveness, accessibility, performance, and usability before completion.
* Verify loading states, empty states, error states, and edge cases.
* Maintain consistency with existing architecture and design patterns throughout the codebase.
