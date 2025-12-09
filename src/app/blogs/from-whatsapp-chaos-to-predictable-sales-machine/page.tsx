import type { Metadata } from 'next';

import {
  fromWhatsappChaosToSalesMachineMeta,
  FromWhatsappChaosToSalesMachineView,
} from 'src/sections/articles';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: fromWhatsappChaosToSalesMachineMeta.title,
  description: fromWhatsappChaosToSalesMachineMeta.description,
};

export default function Page() {
  return <FromWhatsappChaosToSalesMachineView />;
}
