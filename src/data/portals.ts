import type { Portal } from '../types'

/**
 * Catalogue préchargé de portails Microsoft 365.
 * Inspiré de https://msportals.io/ et https://msportals.io/userportals
 *
 * `group` pilote les onglets :
 *   - 'apps'  → applications & services utilisateurs
 *   - 'admin' → portails d'administration & IT
 */
export const DEFAULT_PORTALS: Portal[] = [
  // ── Apps & services utilisateurs ───────────────────────────────
  { id: 'm365', name: 'Microsoft 365', url: 'https://m365.cloud.microsoft', category: 'Accueil', group: 'apps' },
  { id: 'copilot', name: 'Microsoft 365 Copilot', url: 'https://m365.cloud.microsoft/chat', category: 'IA', group: 'apps' },
  { id: 'outlook', name: 'Outlook', url: 'https://outlook.office.com/mail', category: 'Communication', group: 'apps' },
  { id: 'teams', name: 'Microsoft Teams', url: 'https://teams.microsoft.com', category: 'Communication', group: 'apps' },
  { id: 'onedrive', name: 'OneDrive', url: 'https://www.office.com/launch/onedrive', category: 'Fichiers', group: 'apps' },
  { id: 'sharepoint', name: 'SharePoint', url: 'https://www.office.com/launch/sharepoint', category: 'Fichiers', group: 'apps' },
  { id: 'word', name: 'Word', url: 'https://www.office.com/launch/word', category: 'Office', group: 'apps' },
  { id: 'excel', name: 'Excel', url: 'https://www.office.com/launch/excel', category: 'Office', group: 'apps' },
  { id: 'powerpoint', name: 'PowerPoint', url: 'https://www.office.com/launch/powerpoint', category: 'Office', group: 'apps' },
  { id: 'onenote', name: 'OneNote', url: 'https://www.onenote.com/notebooks', category: 'Office', group: 'apps' },
  { id: 'forms', name: 'Forms', url: 'https://forms.office.com', category: 'Office', group: 'apps' },
  { id: 'planner', name: 'Planner', url: 'https://planner.cloud.microsoft', category: 'Tâches', group: 'apps' },
  { id: 'todo', name: 'To Do', url: 'https://to-do.office.com', category: 'Tâches', group: 'apps' },
  { id: 'bookings', name: 'Bookings', url: 'https://outlook.office.com/bookings', category: 'Tâches', group: 'apps' },
  { id: 'loop', name: 'Loop', url: 'https://loop.cloud.microsoft', category: 'Collaboration', group: 'apps' },
  { id: 'whiteboard', name: 'Whiteboard', url: 'https://whiteboard.office.com', category: 'Collaboration', group: 'apps' },
  { id: 'stream', name: 'Stream', url: 'https://www.office.com/launch/stream', category: 'Collaboration', group: 'apps' },
  { id: 'sway', name: 'Sway', url: 'https://sway.cloud.microsoft', category: 'Collaboration', group: 'apps' },
  { id: 'delve', name: 'Delve', url: 'https://delve.office.com', category: 'Collaboration', group: 'apps' },
  { id: 'clipchamp', name: 'Clipchamp', url: 'https://app.clipchamp.com', category: 'Collaboration', group: 'apps' },

  // ── Power Platform ─────────────────────────────────────────────
  { id: 'powerbi', name: 'Power BI', url: 'https://app.powerbi.com', category: 'Power Platform', group: 'apps' },
  { id: 'power-automate', name: 'Power Automate', url: 'https://make.powerautomate.com', category: 'Power Platform', group: 'apps' },
  { id: 'power-apps', name: 'Power Apps', url: 'https://make.powerapps.com', category: 'Power Platform', group: 'apps' },
  { id: 'power-pages', name: 'Power Pages', url: 'https://make.powerpages.microsoft.com', category: 'Power Platform', group: 'apps' },
  { id: 'copilot-studio', name: 'Copilot Studio', url: 'https://copilotstudio.microsoft.com', category: 'Power Platform', group: 'apps' },

  // ── Viva ───────────────────────────────────────────────────────
  { id: 'viva-engage', name: 'Viva Engage', url: 'https://engage.cloud.microsoft', category: 'Viva', group: 'apps' },
  { id: 'viva-insights', name: 'Viva Insights', url: 'https://insights.viva.office.com', category: 'Viva', group: 'apps' },
  { id: 'viva-learning', name: 'Viva Learning', url: 'https://viva.microsoft.com', category: 'Viva', group: 'apps' },

  // ── Compte utilisateur ─────────────────────────────────────────
  { id: 'my-account', name: 'Mon compte', url: 'https://myaccount.microsoft.com', category: 'Mon compte', group: 'apps' },
  { id: 'my-apps', name: 'Mes applications', url: 'https://myapps.microsoft.com', category: 'Mon compte', group: 'apps' },
  { id: 'my-signins', name: 'Mes connexions', url: 'https://mysignins.microsoft.com', category: 'Mon compte', group: 'apps' },

  // ── Administration & IT ────────────────────────────────────────
  { id: 'admin-m365', name: 'Microsoft 365 Admin', url: 'https://admin.microsoft.com', category: 'Administration', group: 'admin' },
  { id: 'entra', name: 'Microsoft Entra', url: 'https://entra.microsoft.com', category: 'Identité & Accès', group: 'admin' },
  { id: 'azure', name: 'Portail Azure', url: 'https://portal.azure.com', category: 'Azure', group: 'admin' },
  { id: 'intune', name: 'Microsoft Intune', url: 'https://intune.microsoft.com', category: 'Gestion des appareils', group: 'admin' },
  { id: 'exchange-admin', name: 'Exchange Admin Center', url: 'https://admin.exchange.microsoft.com', category: 'Administration', group: 'admin' },
  { id: 'teams-admin', name: 'Teams Admin Center', url: 'https://admin.teams.microsoft.com', category: 'Administration', group: 'admin' },
  { id: 'sharepoint-admin', name: 'SharePoint Admin', url: 'https://admin.microsoft.com/sharepoint', category: 'Administration', group: 'admin' },
  { id: 'ppac', name: 'Power Platform Admin', url: 'https://admin.powerplatform.microsoft.com', category: 'Administration', group: 'admin' },
  { id: 'apps-admin', name: 'Microsoft 365 Apps Admin', url: 'https://config.office.com', category: 'Administration', group: 'admin' },

  // ── Sécurité & conformité ──────────────────────────────────────
  { id: 'defender', name: 'Microsoft Defender', url: 'https://security.microsoft.com', category: 'Sécurité', group: 'admin' },
  { id: 'defender-cloud-apps', name: 'Defender for Cloud Apps', url: 'https://security.microsoft.com/cloudapps', category: 'Sécurité', group: 'admin' },
  { id: 'purview', name: 'Microsoft Purview', url: 'https://purview.microsoft.com', category: 'Conformité', group: 'admin' },
  { id: 'compliance', name: 'Purview Compliance', url: 'https://compliance.microsoft.com', category: 'Conformité', group: 'admin' },

  // ── Postes de travail & modern workplace ───────────────────────
  { id: 'windows365', name: 'Windows 365', url: 'https://windows365.microsoft.com', category: 'Gestion des appareils', group: 'admin' },
  { id: 'lighthouse', name: 'Microsoft 365 Lighthouse', url: 'https://lighthouse.microsoft.com', category: 'Administration', group: 'admin' },

  // ── Développeur & référence ─────────────────────────────────────
  { id: 'azure-devops', name: 'Azure DevOps', url: 'https://dev.azure.com', category: 'Développeur', group: 'admin' },
  { id: 'graph-explorer', name: 'Graph Explorer', url: 'https://developer.microsoft.com/graph/graph-explorer', category: 'Développeur', group: 'admin' },
  { id: 'entra-portal-legacy', name: 'Azure AD (aad.portal)', url: 'https://aad.portal.azure.com', category: 'Identité & Accès', group: 'admin' },
  { id: 'partner-center', name: 'Partner Center', url: 'https://partner.microsoft.com', category: 'Administration', group: 'admin' },
  { id: 'learn', name: 'Microsoft Learn', url: 'https://learn.microsoft.com', category: 'Référence', group: 'admin' },
  { id: 'status', name: 'Microsoft 365 Status', url: 'https://status.cloud.microsoft', category: 'Référence', group: 'admin' },
]
