
import React, { useState } from "react";
import { 
  ChevronUp, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Phone, 
  Mail,
  FileText, 
  Link2,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CollapsibleSection = ({ title, children, defaultOpen = true }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-700">{title}</h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

type InfoPanelProps = {
  selectedContactId: string;
};

type LeadStatus = "new" | "follow-up" | "scheduled" | "closed" | "lost";

const InfoPanel = ({ selectedContactId }: InfoPanelProps) => {
  const [leadStatus, setLeadStatus] = useState<LeadStatus>("new");
  const [note, setNote] = useState("");

  if (!selectedContactId) {
    return <div className="w-80 border-l bg-gray-50"></div>;
  }

  const handleStatusChange = (status: LeadStatus) => {
    setLeadStatus(status);
    // Here we would update the status in the API
  };

  const handleAddNote = () => {
    if (note.trim()) {
      // Here we would send the note to the API
      console.log("Adding note:", note);
      setNote("");
    }
  };

  const statusLabels = {
    new: { label: "Nuevo Lead", class: "status-new" },
    "follow-up": { label: "En seguimiento", class: "status-follow-up" },
    scheduled: { label: "Visita agendada", class: "status-scheduled" },
    closed: { label: "Cliente cerrado", class: "status-closed" },
    lost: { label: "Perdido", class: "status-lost" },
  };

  return (
    <div className="w-80 border-l bg-gray-50 flex flex-col h-screen">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=1" alt="Contact" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-medium">Miguel Sánchez</h2>
            <span className={cn("lead-status", statusLabels[leadStatus].class)}>
              {statusLabels[leadStatus].label}
            </span>
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="w-full">
            <TabsTrigger value="info" className="flex-1">Información</TabsTrigger>
            <TabsTrigger value="properties" className="flex-1">Propiedades</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="pt-4">
            {/* Lead management */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado del Lead
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(statusLabels).map(([key, { label }]) => (
                  <Badge
                    key={key}
                    variant={leadStatus === key ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer",
                      leadStatus === key
                        ? "bg-estate-purple hover:bg-estate-dark-purple"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => handleStatusChange(key as LeadStatus)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />
            
            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span>+34 654-789-123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span>miguel.sanchez@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span>Alta: {format(new Date(), "dd/MM/yyyy")}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <div className="pt-4 space-y-3">
              <div className="bg-white rounded-md border p-3">
                <h4 className="font-medium">Ático en Chamberí</h4>
                <p className="text-sm text-gray-600">3 hab. | 2 baños | 120m²</p>
                <p className="text-sm font-medium text-estate-purple mt-1">€450,000</p>
              </div>
              <div className="bg-white rounded-md border p-3">
                <h4 className="font-medium">Piso en Salamanca</h4>
                <p className="text-sm text-gray-600">2 hab. | 1 baño | 85m²</p>
                <p className="text-sm font-medium text-estate-purple mt-1">€320,000</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Notes section */}
        <CollapsibleSection title="Notas">
          <div className="space-y-4">
            <div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-estate-purple resize-none"
                placeholder="Añadir una nota..."
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm"
                  onClick={handleAddNote}
                  className="bg-estate-purple hover:bg-estate-dark-purple"
                >
                  Guardar nota
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Pedro Agente</span>
                  <span className="text-xs text-gray-500">Hoy, 11:20</span>
                </div>
                <p>Cliente interesado en áticos de 3 habitaciones en zona Chamberí. Presupuesto máximo €500k.</p>
              </div>
              
              <div className="bg-white p-3 rounded-md border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">María López</span>
                  <span className="text-xs text-gray-500">Ayer, 16:45</span>
                </div>
                <p>Primera toma de contacto. Busca piso para inversión con rentabilidad mínima del 5%.</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Shared files */}
        <CollapsibleSection title="Archivos compartidos">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <FileText size={16} className="text-estate-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">Catálogo_Propiedades_2023.pdf</p>
                <p className="text-xs text-gray-500">3.2 MB • 15/06/2023</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Download size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <FileText size={16} className="text-estate-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">Contrato_Reserva.docx</p>
                <p className="text-xs text-gray-500">1.8 MB • 14/06/2023</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Download size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </CollapsibleSection>

        {/* Links */}
        <CollapsibleSection title="Enlaces compartidos">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <Link2 size={16} className="text-estate-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">Ficha propiedad en web</p>
                <p className="text-xs text-gray-500 truncate">https://estatechatflow.com/property/123</p>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <Link2 size={16} className="text-estate-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">Tour virtual 360</p>
                <p className="text-xs text-gray-500 truncate">https://tours.estatechatflow.com/vt/123</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
        
        {/* Documentation */}
        <CollapsibleSection title="Documentación" defaultOpen={false}>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <Upload size={16} className="text-estate-purple" />
              <div>
                <p className="text-sm">Subir documentación</p>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-md border flex items-center gap-2">
              <FileText size={16} className="text-estate-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">DNI_Miguel_Sanchez.pdf</p>
                <p className="text-xs text-gray-500">1.1 MB • 12/06/2023</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

// Missing import definition - adding it here
const Download = ({ size, className }: { size: number, className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
};

export default InfoPanel;
