/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "jotai";

const MockDataProvider = ({children}: {children: any}) => <Provider>{children}</Provider>

export default MockDataProvider;
