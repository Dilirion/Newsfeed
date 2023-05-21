import { RootState } from '@app/store';
import { Source } from '@features/sources/types';

export const getSources = (state: RootState): Source[] => state.sources;
