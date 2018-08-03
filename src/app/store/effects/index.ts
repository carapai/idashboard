import { RouterEffects } from './router.effects';
import { SystemInfoEffects } from './system-info.effects';
import { UserEffects } from './user.effects';
import { DashboardSettingsEffects } from './dashboard-settings.effects';
import { DashboardEffects } from './dashboard.effects';

export const effects: any[] = [
  RouterEffects,
  SystemInfoEffects,
  UserEffects,
  DashboardSettingsEffects,
  DashboardEffects
];