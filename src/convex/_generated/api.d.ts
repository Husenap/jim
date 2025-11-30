/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions from "../actions.js";
import type * as activeWorkouts from "../activeWorkouts.js";
import type * as comments from "../comments.js";
import type * as exercises from "../exercises.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as immutableExercises from "../immutableExercises.js";
import type * as measurements from "../measurements.js";
import type * as migrations from "../migrations.js";
import type * as notifications from "../notifications.js";
import type * as pushNotifications from "../pushNotifications.js";
import type * as routines from "../routines.js";
import type * as sickLeaves from "../sickLeaves.js";
import type * as types from "../types.js";
import type * as users from "../users.js";
import type * as workouts from "../workouts.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  activeWorkouts: typeof activeWorkouts;
  comments: typeof comments;
  exercises: typeof exercises;
  functions: typeof functions;
  http: typeof http;
  immutableExercises: typeof immutableExercises;
  measurements: typeof measurements;
  migrations: typeof migrations;
  notifications: typeof notifications;
  pushNotifications: typeof pushNotifications;
  routines: typeof routines;
  sickLeaves: typeof sickLeaves;
  types: typeof types;
  users: typeof users;
  workouts: typeof workouts;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
