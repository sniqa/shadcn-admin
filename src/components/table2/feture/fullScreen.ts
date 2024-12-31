import { makeStateUpdater, Table, TableFeature } from "@tanstack/react-table";
import { RowData } from "../types";

export type FullScrenState = {
  fullScreen: boolean;
};

export type FullScrenOptions = {
  enableFullScreen?: boolean;
};

export interface FullScreenInstance {
  toggleFullScreen: () => void;
}

export const FullScreenFeature: TableFeature<FullScrenState> = {
  getInitialState: (state): FullScrenState => {
    return {
      fullScreen: false,
      ...state,
    };
  },

  getDefaultOptions: (): FullScrenOptions => {
    return {
      enableFullScreen: true,
    } as FullScrenOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleFullScreen = () =>
      makeStateUpdater("fullScreen", table)((old) => !old);
  },
};
