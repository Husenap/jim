/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions from "../actions.js";
import type * as activeWorkouts from "../activeWorkouts.js";
import type * as exercises from "../exercises.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as immutableExercises from "../immutableExercises.js";
import type * as migrations from "../migrations.js";
import type * as notifications from "../notifications.js";
import type * as pushNotifications from "../pushNotifications.js";
import type * as routines from "../routines.js";
import type * as types from "../types.js";
import type * as users from "../users.js";
import type * as workouts from "../workouts.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  activeWorkouts: typeof activeWorkouts;
  exercises: typeof exercises;
  functions: typeof functions;
  http: typeof http;
  immutableExercises: typeof immutableExercises;
  migrations: typeof migrations;
  notifications: typeof notifications;
  pushNotifications: typeof pushNotifications;
  routines: typeof routines;
  types: typeof types;
  users: typeof users;
  workouts: typeof workouts;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
