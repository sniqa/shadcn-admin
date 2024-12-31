/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  makeStateUpdater,
  RowData,
  Table,
  TableFeature,
} from "@tanstack/react-table";

export type DensityState = "sm" | "md" | "lg";

export interface DensityTableState {
  density: DensityState;
}

// define types for our new feature's table options
export interface DensityOptions {
  enableDensity?: boolean;
}

// Define types for our new feature's table APIs
export interface DensityInstance {
  toggleDensity: () => void;
}

export const DensityFeature: TableFeature<any> = {
  // define the new feature's initial state
  getInitialState: (state): DensityTableState => {
    return {
      density: "md",
      ...state,
    };
  },

  // define the new feature's default options
  getDefaultOptions: (): DensityOptions => {
    return {
      enableDensity: true,
    } as DensityOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleDensity = () => {
      makeStateUpdater(
        "density",
        table
      )((old) => (old === "lg" ? "md" : old === "md" ? "sm" : "lg"));
    };
  },
};
