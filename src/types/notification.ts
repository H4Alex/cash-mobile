import type { z } from "zod";
import type { notificationSchema } from "@/src/schemas/api-responses";
import type { notificationPreferencesSchema } from "@/src/schemas/notification";

// ---------------------------------------------------------------------------
// Derived from Zod schemas (single source of truth)
// ---------------------------------------------------------------------------

/** Notification type enum */
export type NotificationType = z.infer<typeof notificationSchema>["tipo"];

/** In-app notification */
export type MobileNotification = z.infer<typeof notificationSchema>;

/** Notification preferences */
export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>;

// ---------------------------------------------------------------------------
// Manual types (no corresponding Zod schema)
// ---------------------------------------------------------------------------

/** Notification list response (inner data from API envelope) */
export interface NotificationListResponse {
  notifications: MobileNotification[];
  meta: {
    total_unread: number;
    next_cursor: string | null;
    has_more_pages: boolean;
  };
}
