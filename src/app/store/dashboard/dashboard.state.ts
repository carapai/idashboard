import { SharingEntity } from '../../modules/sharing-filter/models/sharing-entity';

export interface DashboardSharing {
  id: string;
  user: {
    id: string;
    name: string;
  };
  sharingEntity: SharingEntity;
}

export interface DashboardAccess {
  read: boolean;
  update: boolean;
  externalize: boolean;
  delete: boolean;
  write: boolean;
  manage: boolean;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  group?: string;
  details: any;
  dashboardItems: any[];
  access: DashboardAccess;
}

export interface DashboardMenuItem {
  id: string;
  name: string;
  access: DashboardAccess;
  details: any;
}

export interface DashboardState {
  currentDashboardPage: number;
  dashboardPageNumber: number;
  dashboardPerPage: number;
  currentDashboard: string;
  creatingDashboard: boolean;
  dashboardsLoaded: boolean;
  dashboardLoading: boolean;
  dashboardLoadingHasError: boolean;
  dashboardLoadingError: any;
  dashboards: Dashboard[];
  activeDashboards: Dashboard[];
  dashboardSharing: {[id: string]: DashboardSharing};
  showBookmarked: boolean;
  dashboardSearchItem: DashboardSearchItem;
  dashboardSearchTerm: string;
  dashboardNotification: {
    unreadInterpretations: number;
    unreadMessageConversations: number
  };
}

export interface DashboardSearchItem {
  loading: boolean;
  loaded: boolean;
  headers: any[];
  results: any;
  resultCount: number;
}

export const INITIAL_DASHBOARD_SEARCH_ITEM: DashboardSearchItem = {
  loading: false,
  loaded: true,
  headers: [
    {
      name: 'all',
      title: 'ALL',
      selected: true,
      itemCount: 0
    },
    {
      icon: 'assets/icons/users.png',
      name: 'users',
      title: 'Users',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/table.png',
      name: 'tables',
      title: 'Tables',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/map.png',
      name: 'maps',
      title: 'Maps',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/column.png',
      name: 'charts',
      title: 'Charts',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/report.png',
      name: 'reports',
      title: 'Reports',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/resource.png',
      name: 'resources',
      title: 'Resources',
      selected: false,
      itemCount: 0
    },
    {
      icon: 'assets/icons/app.png',
      name: 'apps',
      title: 'Apps',
      selected: false,
      itemCount: 0
    }
  ],
  results: [],
  resultCount: 0
};

export const INITIAL_DASHBOARD_STATE: DashboardState = {
  currentDashboardPage: 0,
  dashboardPageNumber: 0,
  dashboardPerPage: 8,
  currentDashboard: undefined,
  dashboardsLoaded: false,
  dashboardLoading: true,
  creatingDashboard: false,
  dashboardLoadingHasError: false,
  dashboardLoadingError: null,
  dashboards: [],
  dashboardSharing: null,
  showBookmarked: false,
  activeDashboards: [],
  dashboardSearchItem: INITIAL_DASHBOARD_SEARCH_ITEM,
  dashboardSearchTerm: '',
  dashboardNotification: {
    unreadInterpretations: 0,
    unreadMessageConversations: 0
  }
};

export const DASHBOARD_TYPES: any = {
  users: 'USERS',
  reports: 'REPORTS',
  resources: 'RESOURCES',
  apps: 'APP',
  charts: 'CHART',
  eventCharts: 'EVENT_CHART',
  eventReports: 'EVENT_REPORT',
  maps: 'MAP',
  reportTables: 'REPORT_TABLE'
};
