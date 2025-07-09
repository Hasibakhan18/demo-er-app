Product Requirements Document: ERModeler
Version: Detailed Consolidated Draft v3.0
Date: 2025-04-10
Status: Draft
Author: AK Baig
Stakeholders: Development Team, Product Management, UX/UI Design, QA, DevOps, Sales/Marketing, Tenant Administrators, Org Administrators, Security Administrators, Compliance Officers, InfoSec Officers, Chief Data Officers, Enterprise/Domain Data Architects, Enterprise/Domain/Data Stewards, Data Owners, Data Modelers, Business Analysts, DBAs, Application Developers, AI Specialists, Model Reviewers, Business Domain SMEs, End User Representatives, API/Integration Specialists, Model Migration Specialists, Vendor/Tool Administrators, External Auditors.
1. Introduction
1.1 Purpose
ERModeler serves as a premier, unified, multi-tenant SaaS platform, accessible globally via ERModeler.com, dedicated to centralizing and enhancing enterprise data modeling. Its core mission is to bridge the communication gap between business stakeholders defining requirements and technical teams implementing database solutions. By providing an integrated, collaborative web environment, ERModeler supports the complete data modeling lifecycle—from initial concept brainstorming using Mind Maps and requirements definition using Requirement Models, through detailed Conceptual (CDM), Logical (LDM), and Physical (PDM) data design, and Object-Oriented (OOM) modeling, up to database schema generation and reverse engineering. The platform emphasizes clear communication, data quality, modeling consistency, and integrated data governance. Furthermore, ERModeler features an integrated AI Assistant to guide users, suggest improvements aligned with best practices, enforce standards, and automate tasks, thereby significantly improving modeling efficiency, accuracy, and overall quality.
1.2 Scope
This document outlines the comprehensive requirements for the ERModeler platform. The functional and non-functional scope includes:
Platform Architecture: A robust, secure, multi-tenant SaaS architecture ensuring strict data segregation, supporting custom domains, and built upon a modern, scalable cloud-native technology stack.
Organizational Structure: Hierarchical organization within tenants using Folders to contain Models and Dictionaries. No separate "Project" or "ModelFolder" concepts exist; projects can be organized using folders.
Model Support: A rich suite of integrated Business Model types (MMM, RQM, DCM, BPM) and Technical Model types (CDM, LDM, PDM, OOM).
Dictionary Management: Centralized repositories for Business, Technical, Governance, and Security dictionaries, supporting definition, management, and inheritance.
Core Modeling & Diagramming: A sophisticated, interactive diagramming interface (JointJS+) for visualizing and manipulating all model elements specific to each type. Includes advanced styling, layout, and interaction capabilities.
Model Lifecycle & Collaboration: Comprehensive model lifecycle support featuring robust version control with branching and merging (analogous to Git), a defined workflow incorporating review/approval via Merge Requests, element-level locking for concurrent edits on shared branches, integrated commenting with status tracking, and notifications.
Model Transformation & Engineering: Bi-directional transformation capabilities including forward engineering (e.g., CDM -> LDM -> PDM -> DDL) and reverse engineering (Database -> PDM).
Database Support (V1): DDL generation and reverse engineering focused on the current, generally available versions of PostgreSQL and Snowflake. Roadmap includes broader database support.
AI Assistance: Integrated AI providing contextual suggestions, prompt-based modeling via chat, best practice enforcement, and layout optimization, with visual cues for AI-driven changes.
Unified Search: A high-performance Master Index (Typesense) offering unified, context-aware, and scope-filterable search across all platform artifacts.
Security & Access Control: Granular Role-Based Access Control (RBAC) using system-defined Roles and tenant-managed Groups, applied primarily via Folder inheritance. Secure authentication (V1: local password, Google Auth).
Tenant Marketplace: Functionality for tenants to publish and sell/share production models, and for others to acquire/subscribe, including update notifications and synchronization features.
Element Referencing: Ability to reference various resources (including diagrams and other model elements) across the tenant space, supporting reuse and consistency, with tracking via Source IDs.
2. System Architecture
2.1 Multi-tenant Structure
Hierarchy: The system employs a clear hierarchy: Organizations contain Tenants. Within each Tenant, a flexible hierarchical Folder structure is the primary means of organizing all artifacts. Folders can contain Subfolders, Models (of various types), and Dictionaries. Strict data isolation is maintained between tenants at all levels.
Domains: Supports tenant-specific custom domains and application-domain-based subdomains for tenant access.
Folder Contents: Folders are versatile containers holding:
Subfolders (allowing nested organization).
Models (Instances of Business or Technical model types like MMM, RQM, CDM, LDM, PDM, etc.).
Dictionaries (Instances of Business, Technical, Governance, or Security dictionary types).
2.2 Inheritance Mechanisms
Dictionary Inheritance: Dictionaries defined in a folder are inherited (read-only reference access) by all descendant folders and the artifacts within them. Child folders can define their own dictionaries or override specific inherited definitions.
Authorization Inheritance: Access control primarily operates via folder inheritance. Groups (containing Users and assigned system Roles) are assigned to specific Folder instances. These permissions automatically cascade down the hierarchy. Explicit permissions/denials on child objects override inheritance.
2.3 Technical Architecture
Backend: .NET C# (LTS), ASP.NET Core, Clean Architecture. PostgreSQL with EF Core. REST API with OpenAPI/Swagger. Typesense for search. Redis for caching (row, full, SQL results, metadata). RabbitMQ with MassTransit for async tasks & Domain Events. SignalR for real-time notifications. Serilog for logging. xUnit & Moq/NSubstitute for testing.
Frontend: Next.js (React LTS). JointJS+ for diagramming. TanStack Query and Redux for state management. Tailwind CSS & ShadCN UI for styling. Jest, RTL, Cypress/Playwright for testing.
AI Integration: Backend services interact securely with external LLM APIs.
Authentication: Framework supports multi-auth. V1: Hashed Passwords, Google Auth. Uses JWT sessions. Future: Other social logins, SSO (SAML, OpenID Connect TBD).
Deployment & Operations: Multi-Cloud (AWS, GCP, Azure) via Docker/Kubernetes. IaC via Terraform/Pulumi. Monitoring via Cloud Native tools + OpenTelemetry. Email via SendGrid/AWS SES (tenant config) or Papercut SMTP (dev).
3. Dictionary Types
3.1 Business Dictionary
Purpose: Standardizes business language and concepts.
Components: Structured entries for Business Concepts & Hierarchies, Business Terms (definitions, acronyms, synonyms), Data Elements & Critical Data Elements (CDEs) definitions, Business Rules, links to Mind Maps, optional Collibra ID mapping, and categorization by Business Domain.
3.2 Technical Dictionary
Purpose: Defines technical standards and reusable assets.
Components: Entries for Naming Standards (Term/Abbreviation pairs), Data Type Domains (logical/physical types with constraints), Enum Definitions (allowed value lists), Technical Modeling Rules/Guidelines, Stereotypes (see below), Implementation Patterns, and Physical Naming Conventions.
Stereotypes: User-defined classifications (e.g., Transactional, Master Data) applicable to model elements. Each has Name, Code, Description, and configurable foreground/background colors influencing element visuals. Initially cloned from platform defaults, tenants can override/extend this list via an editable management panel accessed from the properties UI.
3.3 Governance Dictionary
Purpose: Centralizes governance policies, quality rules, and compliance requirements.
Components: Entries for Data Quality Rules (with dimensions, logic), Validation Rules, Security Classifications (sensitivity levels), Governance Policies (ownership, stewardship, usage), and Compliance Rules (mapping to regulations). References technical Enums/Constraints where applicable.
3.4 Security Dictionary
Purpose: Defines and manages the building blocks of the access control system. This dictionary is typically managed by Security Administrators and is crucial for defining how users interact with the platform's resources.
Components:
Users: Contains definitions of individual user accounts within the tenant or organization, including user identifiers, authentication details (or references), profile information, and status.
Groups: Defines collections of users. Groups are the primary entities to which Roles are assigned for permission granting. Groups can be created and managed by Tenant Administrators within specific folder contexts or at higher levels (Tenant/Organization).
Roles: Contains the definitions of system-provided Roles (e.g., Data Modeler, Data Steward, Read Only User, Tenant Admin). Each Role represents a collection of granular Permissions. Tenants assign these predefined Roles to their Groups; they cannot create new Roles.
Permissions: Defines the granular actions (e.g., Read, Write, Delete, Approve, Publish) that can be performed on specific Resource Types (MetaEntities like Model, Dictionary, Folder, Entity, Attribute). Permissions are system-defined and aggregated into Roles.
Security Policies: May contain definitions related to broader security configurations, password policies, session timeouts, etc., although much of this may be framework configuration rather than dictionary entries.
4. Model Types and Object Types
4.1 Business Models(Not in POC scope)
Mind Map Model (MMM): Objects: CentralTopic, MainTopic, SubTopic, TopicConnection.
Requirement Model (RQM): Objects: RequirementGroup, Requirement, Stakeholder, UseCase, TestCase.
Data Concept Model (DCM): Objects: BusinessConcept, BusinessConceptRelationship, CriticalDataElement.
Business Process Model (BPM): Objects: Process, Task, Flow, DecisionGate, Lane/Pool.
4.2 Technical Models
Conceptual Data Model (CDM): Notation: Crow's Foot. Supports Inheritance.
Model Structure: Contains Diagrams, Entities (with Attributes), Relationships. Can reference Technical Dictionaries.reference
Logical Data Model (LDM): Notation: Crow's Foot. V1: Single-attribute keys.
Model Structure: Contains Diagrams, Entities (with Attributes), Relationships. Can reference Technical Dictionaries.
Physical Data Model (PDM): Targets V1: PostgreSQL (current), Snowflake (current). V1: Single-column keys.
Model Structure: Contains Diagrams, Tables (with Columns), Indexes, Constraints (PK, FK, Unique, Check), Foreign Keys, Views. Can reference Technical Dictionaries.
Object-Oriented Model (OOM):
Model Structure: Contains Diagrams, Classes (with Attributes, Methods), Interfaces, Inheritance relationships.
4.3 Base Object Properties & Element Origins
Common Properties: Most named elements managed by the framework share base properties: Id (ULID), Name, Code, Description, Type (MetaEntityType), FullPath, ParentId, Icon, CreationTimestamp, CreatedByUserId, ModificationTimestamp, ModifiedByUserId, DeletionTimestamp, DeletedByUserId (soft delete), Status (lifecycle state), SourceElementId (ULID, Null if Native), SourceTenantId (ULID, Null if Native).
SourceElementId / SourceTenantId: Present on model elements (Entities, Attributes, Relationships, Tables, Columns, potentially Diagrams, etc.). Null values indicate the element is Native to its container model. Non-null values indicate it's Cloned or Referenced, linking it to the original element for tracking changes and enabling ModelSync (for Cloned, subscribed elements).
Element Origins & Visuals:
Native: Solid border. Mastered within the current model.
Referenced: long dashed border (- - - -). Read-only view of the source, reflects source changes automatically. Promotes reuse.
Cloned: short dashed  border (- . - . - .). Independent, editable copy. Notifies on source change, requires manual ModelSync action to update.
Resource Referencing: Any resource (Model elements, Diagrams, Dictionary terms) can potentially be referenced from anywhere within the tenant space using the SourceElementId / SourceTenantId mechanism. Referenced diagrams act like linked views, showing the current state of the source diagram.
5. Model Transformation
5.1 Supported Transformation Paths
Defined forward (MMM -> DCM -> CDM -> LDM -> PDM -> DDL), reverse (DB -> PDM -> LDM -> CDM), and specialized (PDM -> OOM, etc.) transformation paths are supported.
5.2 Transformation Process & AI Assistance
Interactive, rule-based transformations with user review. AI assists with intelligent mapping, issue identification, and best practice suggestions.
6. User Interface (UI) Requirements
6.1 Overall Layout & Panels
Layout: Central diagram canvas, collapsible side panels.
Left Zone (Collapsible): Vertical stack: 1. Folder Explorer, 2. Model Explorer, 3. AI Panel (expands to occupy zone when active, collapsing others).
Middle Zone: Main diagram canvas.
Right Zone (Collapsible): Vertical stack: 1. Properties Panel, 2. Comments Panel (contextual, dismissible).
6.2 Explorer Views
Folder Explorer: Tree view of tenant folders ('Organization', 'Marketplace' roots). Shows contained Folders, Models, Dictionaries. Context menu actions. Drag-and-drop organization.
Model Explorer: Tree view of the open model's structure, tailored to type (e.g., for PDM: Diagrams, Tables -> Columns, Indexes, Constraints, FKs, Views, Attached Dictionaries).
6.3 Diagram Canvas & Interaction
Canvas: Zoomable/pannable surface with grid/snap options.
Interaction: Standard selection (click, shift, ctrl), move (drag, arrows), resize (handles, ctrl+arrows), delete, duplicate (Ctrl+D), group/ungroup, arrange (z-order). Pan via Space+Drag.
Context Menus: Right-click provides actions relevant to selection (Canvas, Element, Multi-Select) including Create, Properties, Comments, Add Attribute, Set Key, Style, Lock, Align, Distribute, Ask AI, etc.
Visuals: Elements styled by type and Stereotype (color). Distinct borders for Native/Referenced/Cloned. Relationships route around shapes. Comment bubbles show pending count. Simple text notes.
Auto-Layout: Orthogonal, Hierarchical, Circular options.
6.4 Properties Panels
Located in right zone, opens via double-click or "Properties" context menu action.
Tabbed: Organizes properties.
General Tab: Common fields: Id, Name, Code, Description, Stereotype (Dropdown + '...' button).
Specific Tabs: Dynamically shown based on selection (Attributes, Columns, Constraints, etc.).
Stereotype Selection: Dropdown lists applicable stereotypes. '...' button opens editable panel to manage tenant's stereotype list (Names, Codes, Descriptions, Colors).
Reordering: UI support (drag-drop or buttons) for reordering items like Attributes/Columns based on DisplayOrder.
6.5 Specific Operations
Entity/Attribute: Add Entity via search (Ctrl+F), toolbar, context menu. Adds 'Id' (UUID). Inline attribute editing with Tab navigation.
Relationships: Draw between ports. Edit properties via panel/menu.
6.6 Search and Navigation (Master Index Integration)
Search Bar: Prominently displayed.
Context-Sensitivity: The search bar's default scope (Tenant, Model, Dictionary) and target index (Framework vs. Tenant) automatically adjust based on the user's current view in the main application window (e.g., viewing a specific model defaults scope to 'Model').
Manual Scope Override: User can always manually change the search scope using the associated dropdown control.
Functionality: Uses Typesense Master Index for fast, relevant results and suggestions.
6.7 Keyboard Shortcuts
Extensive shortcuts provided for efficiency across general, selection, movement, editing, zooming, and element-specific operations.
7. Collaboration Features
7.1 Comments and Annotations
Symbol Comments: Attach threaded discussions to diagram symbols. Accessed via indicator icon (bubble with pending count) or context menu -> Comments Panel. Comment types (request, suggestion, info) and priority can be set.
Workflow: Comment Creator or Folder Admin can edit/delete. Intended recipient(s) or users with edit permissions can modify status (Pending, Accepted, Rejected, Completed, Cancelled) and reply. Panel allows filtering by status.
Notifications: Triggered only if the model is on the user's "Watch" list.
Diagram Notes: Simple, visible text boxes on the canvas.
8. AI Integration
8.1 AI-Driven Features & Interaction
Capabilities: Contextual assistance for model enhancement, validation, and generation from prompts.
Interaction:
AI Chat Window: Located in the collapsible AI Panel (left zone). Used for general queries and prompt-based generation. Activation collapses Folder/Model Explorers.
Context Menu: "Ask AI" option on selected model elements for specific queries/actions related to that element.
AI Change Indication: Changes applied to the diagram based on AI suggestions must be visually distinct (e.g., different color highlighting, specific icons) until explicitly accepted by the user. Provide mechanisms to accept or reject individual AI-driven changes.
V1 Scope: Basic suggestions (naming, types) and simple Q&A.
8.2 AI Infrastructure
Manages prompt templates, secure LLM API interaction, and feedback loops.
9. Database Generation & Engineering
9.1 DDL Generation
Targets (V1): Current versions of PostgreSQL, Snowflake.
Scripts: Generate accurate DDL (CREATE, ALTER, DROP) for all PDM objects. Options for full/partial/delta scripts.
9.2 Forward Engineering
Secure DB connection and execution of generated DDL.
9.3 Reverse Engineering
Connect securely (V1: PostgreSQL, Snowflake), read metadata, select objects, generate PDM.
10. Security and Access Control
10.1 Authorization Model (RBAC)
Structure: System defines Permissions (Action+ResourceType) & Roles. Tenants manage Users & Groups. Tenant Admins assign system Roles to Groups.
Assignment (V1): Access granted only by assigning Groups to specific Folder instances (Resource ID). Permissions inherited hierarchically. Direct assignment to Resource Types (MetaEntityId) is NOT supported in V1.
Group Scope: Groups managed at Org, Tenant, and Folder levels.
Tenant Admin Group: Default 'Tenant Administration Group' created at onboarding, initial user added. Manages 'Organization' root folder.
Root Folders: 'Organization' and 'Marketplace' exist at tenant root.Marketplace publishing requires specific admin privileges.
Roles: Utilizes comprehensive predefined system roles.
10.2 Authentication
V1 Methods: Secure local accounts (hashed passwords), Google Authentication.
Session: JWT based for APIs.
10.3 Object Locking for Concurrency
Requirement: Mandatory when multiple users edit the same shared branch (e.g., draft) simultaneously. Not needed for personal/feature branches.
Mechanism: Element-level pessimistic locking with visual indicators, owner info, timeout (e.g., 5 mins), admin override. LockInfo includes Name, Email, Time, Expiry, Level. Real-time status via SignalR.

🔐 10. Security and Access Control (Updated)
10.1 Authorization Model (RBAC)
✅ Structure:
The system defines Permissions as a combination of Action + ResourceType and bundles them into Roles.


Tenants manage Users and Groups.


Tenant Admins assign system-defined Roles to Groups.


Groups are used as the sole mechanism for permission assignments.


✅ Assignment (V1.1 - Updated):
Access is granted by assigning Groups to specific Folder instances (via Resource ID).


Direct assignment to MetaEntityId (Resource Type) remains unsupported in V1.


Permissions are inherited hierarchically from parent folders to child folders.


Groups can now be:


Viewed and managed via UI panels that show group names, members, and associated roles.


Edited inline, allowing:


Assignment of new roles to existing members


Addition of new members with roles


Display of role assignments clearly in context


Group editing uses modal dialogs with fields for:


Group Name


User Name


Role Name


✅ Group Scope:
Groups are scoped at three levels:


Organization-level


Tenant-level


Folder-level


Groups at broader scopes (Org or Tenant) can be reused across multiple folders.


✅ Tenant Admin Group:
A default group named ‘Tenant Administration Group’ is created during tenant onboarding.


The first user onboarded is added to this group.


This group has full access to the Organization root folder and critical system configuration features.


✅ Root Folders:
Two system-level folders exist at the tenant root:


Organization


Marketplace


Publishing to Marketplace requires admin privileges assigned via system roles to specific groups.


✅ Roles:
The system utilizes a comprehensive set of predefined roles, such as:


Admin


Data Modeller


Model Admin


User


Reviewer


Roles are:


Assigned per user per group


Displayed in the UI grouped by membership and editable via modals



10.2 Authentication
✅ Methods (V1):
Secure local accounts using hashed passwords (bcrypt or similar)


Google Authentication via OAuth2


✅ Sessions:
JWT-based authentication for secure and stateless API access


Tokens include claims necessary for role/group resolution



10.3 Object Locking for Concurrency
✅ Requirement:
Locking is mandatory for shared editing of draft branches


Not required for personal or feature branches


✅ Mechanism:
Implements element-level pessimistic locking


Lock includes metadata:


Owner Name, Email, Time Acquired, Expiry, Lock Level


Lock UI features:


Visual indicators (e.g., icons or badges)


Real-time updates using SignalR


Timeouts (default: 5 minutes)


Admin override capability for force-unlocking



📝 Summary of UI-Driven Changes Incorporated:
Change Area
PRD Update
Role Assignment UI
Added support for modal-based role assignment per group
Group Membership Management
Inline editing of group name, adding users, and assigning multiple roles
Roles Visibility
UI design shows role assignments clearly under each group
Member-Level Role Assignment
Each user within a group may have distinct role(s), now reflected in PRD
Admin Override Options
Preserved in Locking section, matching original concurrency management



11. Model Management and Lifecycle
11.1 Lifecycle Workflow & Branching
Branching Strategy: Gitflow-like: prod, uat, qa, dev (read-only env branches); draft (integration, requires locking for direct edits); feature/* (isolated dev, no locking); hotfix/*. No concept of separate "Personal Folders" for drafts; personal/local branches serve this purpose and are not visible until merged to draft.
Workflow: Task -> Create feature branch -> Develop -> Initiate MR to draft -> Approval Workflow (Business/Tech review diff via MR) -> Merge approved MR -> Promote via merges (draft->dev->...). Hotfix process defined.
11.2 Version Control & Compare/Merge
Full version history. Branching support.
Compare/Merge: Delta-based comparison between versions/branches at the Model Element Property level. Supports MR review. Merge conflict detection and resolution UI providing 'mine/theirs' choices per property conflict.
11.3 Publishing and Marketplace
Publishing: Tenants publish prod branch models to /Marketplace/Share/. Admin role needed.
Listing & Sales: Free or priced listing. Commission: Max($10, 25%). Seller anonymity (screen name only). Marketplace discovery interface.
Acquisition: Buyers acquire models into /Marketplace/Vendor(ScreenName)/Subscribe/. Model is cloned with SourceModelId/SourceTenantId.
Sync: Subscribed models get source update notifications and ModelSync capability. One-time purchases do not sync.
Communication: Platform messaging for seller-buyer interaction (moderated).
12. Non-Functional Requirements
Performance: Responsive UI, fast loads/search, large model handling, efficient caching (Redis).
Scalability: Horizontal scaling for all tiers, tenant/user/data growth support.
Reliability/Availability: High uptime (99.9%), Backup/DR, fault tolerance, reliable messaging.
Security: OWASP Top 10, RBAC, Tenant Isolation, Encryption, Input Validation, Secure Config (incl. TXT/CNAME DNS validation for email).
Usability/Accessibility: Intuitive, consistent UI. WCAG 2.1 AA target.
Maintainability: Clean Architecture, modularity, test coverage, docs, CI/CD.
Interoperability/Portability: Multi-cloud (K8s), data export standards.
13. Master Index (Search)
13.1 Overview & Architecture
The Master Index is a critical component providing fast, unified search across the platform. It's implemented using Typesense, fed asynchronously from PostgreSQL (the source of truth) via Change Data Capture (CDC) mechanisms (Debezium monitoring WAL, events published to RabbitMQ/Kafka). A dedicated API Layer service handles JWT authentication/authorization, receives search requests, constructs context-aware Typesense queries based on user permissions and selected scope, executes searches, and handles the CDC event consumption/transformation/indexing process.
13.2 Indices & Context-Sensitivity
Indices: Two main index types: MasterIndex_Framework (for global data like system Roles, Actions, Permissions, static LOVs - other content TBD) and MasterIndex_Tenant_<TenantULID> (for all tenant-specific artifacts).
Context-Sensitive Search Bar: The search bar's behavior adapts to the user's current context within the application.
Default Scope: When the user is viewing the main dashboard or top-level folders, the scope defaults to 'Tenant', searching the MasterIndex_Tenant_<TenantULID>. If viewing framework/admin sections, it might default to searching MasterIndex_Framework.
Contextual Scope Change: If the user navigates into a specific Model or Dictionary view, the search scope automatically defaults to 'Model' or 'Dictionary' respectively, pre-filtering results to that context.
Manual Override: The user can always use the scope selection dropdown next to the search bar to explicitly choose 'Tenant', 'Model', or 'Dictionary' scope, overriding the context-sensitive default.
Index Targeting: Based on the selected scope and user context, the API Layer directs the query to the appropriate index (Framework or the specific Tenant index).
13.3 Schema (PostgreSQL Source Table Structure)
SQL
-- Structure for MasterIndex_Tenant (MasterIndex_Framework is similar but without TenantId/scope limits)
CREATE TABLE MasterIndex_Tenant (
    Id UUID PRIMARY KEY,
    -- Scope field interpretation needed - likely derived or applied at query time based on TenantId/RoleIds
    TenantId UUID, -- NOT NULL for Tenant index
    RoleIds UUID[], -- Applicable roles for access control
    FavoriteUserIds UUID[], -- List of users who marked as favorite
    RecentUserIds UUID[], -- List of users who recently accessed
    SearchContextCode VARCHAR, -- Hierarchical context code (e.g., Tenant.Model.Entity, Tenant.Dictionary.Business)
    ParentContextId ULID, -- ULID of the logical parent item in the index
    ParentMetaEntityId UUID, -- MetaEntity type ID of the parent
    ParentResourceId UUID, -- Instance ID of the parent resource
    MetaEntityId VARCHAR, -- MetaEntity type ID of this item
    MetaAttributeId VARCHAR, -- MetaAttribute type ID if applicable (e.g., for LOV items)
    Name VARCHAR, -- Display Name
    Code VARCHAR, -- Unique Code/Identifier
    Description TEXT,
    IconUrl TEXT,
    Path TEXT[], -- Materialized path string array for breadcrumbs/hierarchy
    Level INTEGER, -- Depth in hierarchy
    DisplayOrder INTEGER, -- Default sort order
    IsLeafFlag BOOLEAN, -- Indicates if it has children in the hierarchy
    Tags TEXT[], -- Searchable tags
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Note: Potential inconsistency in original SQL regarding Scope CHECK constraint needs review.
-- Note: UserFavorites might still be a separate relational table for explicit user actions.


14. Glossary
(Includes key terms defined throughout)
15. Open Questions & Assumptions
15.1 Open Questions
Q1: Finalize V1 fields, structure, relationships, UI for managing entries within each Dictionary type.
Master Index Scope: Clarify representation/querying of different Scopes (Global, Tenant, Role, User) based on the provided SQL schema. Define MasterIndex_Framework structure.
AI V1 Capabilities: Define specific V1 AI features (suggestions, Q&A topics). Finalize AI Chat Window UI presentation.
Stereotype Management: Detail the UI/process for tenants extending/overriding Stereotypes. Define initial default Stereotypes.
Code Field Behavior: Finalize if 'Code' property is user-editable, auto-generated, optional, or varies by context.
Marketplace Commission/Payments: Finalize commission %/$ and if V1 includes payment processing or just listing/discovery.
15.2 Assumptions
RBAC model and V1 permission assignment (Group -> Folder Instance only) are definitive.
draft/feature/prod branching and MR workflow is standard. Locking required for direct draft edits.
Compare/Diff and Merge Conflict Resolution ('mine/theirs' per property) are sufficient for V1.
V1 DB support: Current PostgreSQL, Snowflake. V1 Keys: Single attribute/column. V1 Notation: Crow's Foot.
Email requires TXT/CNAME DNS validation. Cloud Native monitoring is acceptable. React Query + Redux coexist.
AI change indication (visual distinction + accept/reject) is required.
Base object properties (Id, Name, Code, Description, SourceElementId, SourceTenantId, etc.) apply broadly.
Context-sensitive search bar behavior is correctly understood.

