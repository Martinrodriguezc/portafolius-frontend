import React from "react";
import CreateProtocol from "../../components/admin/protocol/CreateProtocol";
import ListProtocols from "../../components/admin/protocol/EditProtocol";

import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";

import { PlusCircle, List as ListIcon } from "lucide-react";

export default function ProtocolSettings(): React.ReactElement {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Protocolos
          </h1>
          <p className="text-gray-500">
            Gestiona los protocolos clínicos de la plataforma
          </p>
        </div>

        <TabsContainer defaultValue="create">
          <TabsList className="mb-6">
            <TabsButton value="create">
              <PlusCircle className="mr-2 h-4 w-4" /> Crear protocolo
            </TabsButton>
            <TabsButton value="list">
              <ListIcon className="mr-2 h-4 w-4" /> Editar protocolos
            </TabsButton>
          </TabsList>

          <TabsPanel value="create">
            <CreateProtocol />
          </TabsPanel>

          <TabsPanel value="list">
            <ListProtocols />
          </TabsPanel>
        </TabsContainer>
      </div>
    </div>
  );
}
