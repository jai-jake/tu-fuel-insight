/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { datasets } from "../datasets";

export const MockDataAtom = atom<any>(datasets);
