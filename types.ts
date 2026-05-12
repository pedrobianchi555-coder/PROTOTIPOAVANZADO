
export enum UserRole {
  ADMIN = 'admin',
  QA = 'qa',
  PROD = 'prod',
  LEAD = 'lead',
  USER = 'user',
  SECURITY = 'security'
}

export enum RecipeStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

export interface Ingredient {
  id?: string;
  reception_no: string;
  provider_name: string;
  group_name?: string;
  bags_qty: number;
  weight_kg: number;
  calc_percent: number;
  cadmium_level?: number;
}

export interface VehicleVisit {
  id: string;
  arrival_date: string;
  arrival_time: string;
  vehicle_plate: string;
  trailer_plate?: string;
  vehicle_type?: string;
  vehicle_brand?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  driver_id_number?: string;
  driver_name?: string;
  origin_zone?: string;
  status: 'EN_PLANTA' | 'SALIDA';
  registered_by?: string;
  created_at?: string;
}

export interface SecurityCheckin {
  id: string;
  operation_type?: 'RECEPCION' | 'DESPACHO';
  checkin_date: string;
  checkin_time: string;
  vehicle_plate: string;
  driver_id_number?: string;
  driver_name?: string;
  origin_zone?: string;
  vehicle_type?: string;
  vehicle_brand?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  trailer_plate?: string;
  torre_1: number;
  torre_2: number;
  total_weight_kg: number;
  total_humidity: number;
  humidity_deduction_kg: number;
  total_sacks_0: number;
  total_sacks_04: number;
  total_sacks_06: number;
  total_sacks_1: number;
  sacks_deduction: number;
  observations?: string;
  registered_by?: string;
  status: 'PENDIENTE' | 'VINCULADO' | 'DISCREPANCIA';
  linked_reception_id?: string;
  linked_dispatch_id?: string;
  visit_id?: string;
  created_at?: string;
}

export interface SecurityCheckinPallet {
  id?: string;
  checkin_id?: string;
  pallet_number: number;
  peso: number;
  humedad: number;
  sacos_0: number;
  sacos_04: number;
  sacos_06: number;
  sacos_1: number;
}

export interface Supplier {
  id: string;
  name: string;
  identity_number?: string;
  variety?: string;
  zone?: string;

  // New Sustainable Development Fields
  code?: string;
  locality?: string;
  municipality?: string;
  state?: string;
  hectares?: number;
  yield_estimate?: number;
  used_capacity?: number;
  available_capacity?: number;
  production_factor?: number; // Factor kg/ha
  yearly_production_kg?: number; // Calculated capacity
  coordinate?: string;
  latitude_longitude?: string;
  status_1?: string;
  status_2?: string;
  status_3?: string;
  status_4?: string;
  client_affiliation?: string;
  axis?: string;
  supplier_type?: 'PROVEEDOR' | 'PRODUCTOR' | 'AMBOS';
  created_at?: string;
}

export interface TraceabilityAssignment {
  id: string;
  lot_code: string;
  producer_id: string;
  producer?: Supplier; // Join result
  contribution_kg: number;
  created_at?: string;
  created_by?: string;
}

export interface Recipe {
  id?: string;
  format_code: string;
  client_name: string;
  client_id?: string; // Added for robust linking
  sample_number: string;
  recipe_code: string;
  contract_id?: string;

  instructions: string;

  spec_max_mold: number;
  spec_max_imp: number;
  spec_max_insect: number;
  spec_exp_loss: number;

  ingredients: Ingredient[];
  status: RecipeStatus;

  approvals: {
    [key in UserRole]: { signed_at: string; user_id: string } | null;
  };
  created_at?: string;
  is_used?: boolean;
}

export interface Sample {
  id: string;
  sample_number: string;
  client: string;
  country: string;
  tipo_producto: string;
  lote_origen?: string;
  tracking_number?: string;
  preparation_date?: string;
  sample_weight?: number;
  dhl_cost?: number;
  taxi_cost?: number;
  sample_type?: string;
  status: string;
  motorizado_tramo_interno?: string;
  motorizado_tramo_externo?: string;
  fecha_salida_pilar?: string;
  fecha_llegada_guarenas?: string;
  fecha_salida_guarenas?: string;
  fecha_llegada_ccs?: string;
  fecha_revision_ccs?: string;
  tipo_entrega_courier?: string;
  evidencia_entrega_dhl?: string;
  courier_status?: string;
  approval_status?: string;
  feedback_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface ClientContract {
  id: string;
  contract_id: string;
  client_id: string;
  client_name: string;
  country: string;
  port: string;
  variety: string;
  volume_mt: number;
  status: string;
  estatus_fijaciones: string;
  product_type: string;
  lot_number?: string;
  bl_number?: string;
  certification_type: string;
  created_at?: string;
  max_cadmium?: number;
  fixed_percentage?: number; // Percentage of contract volume that is price-fixed (0-100)
}

export interface Reception {
  id: string;
  reception_code: string;
  reception_date: string;
  reception_time?: string;
  almacen?: string;
  proveedor?: string;
  provider_name?: string;
  productor?: string;
  variety: string;
  tipo?: string;
  placa?: string;
  vehicle_plate?: string;
  cedula?: string;
  driver_name?: string;
  procedencia?: string;
  vehicle_type?: string;
  vehicle_brand?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  torre_1?: number;
  torre_2?: number;
  total_pesos_paletas: number;
  weight_kg?: number; // Alias
  total_humedad_promedio: number;
  humidity_percent?: number; // Alias
  total_sacos_0?: number;
  total_sacos_04?: number;
  total_sacos_06?: number;
  total_sacos_1?: number;
  sacks_total?: number; // Alias
  qc_status: string;
  inventory_status: string;
  warehouse_location?: string;
  classification?: string;
  purchase_order_id?: string;
  flag_for_return?: boolean;
  return_kg?: number; // Partial return: kg to return
  return_sacks?: number; // Partial return: sacks to return (calculated at 60.6 kg/sack)
  detailed_quality_analysis?: DetailedQualityAnalysis[];
  quality_control_records?: QualityControlRecord[];
  cadmium_level?: number;
  is_reserved?: boolean;
  reservation_note?: string;
  has_sensory?: boolean;
  has_technical?: boolean;
  unit_cost_usd?: number; // Calculated production cost or PO price
  average_sack_weight?: number;
}

export interface DetailedQualityAnalysis {
  id?: string;
  reception_id: string;
  reception_code?: string;
  analysis_date: string;
  analyst_name: string;
  sample_size_kg: number;
  primary_production_data: PrimaryProductionRow[];
  non_commercial_data: NonCommercialItem[];
  moisture_percent: number;
  fermentation_percent: number;
  slaty_percent: number;
  violet_percent: number;
  black_percent: number;
  mold_percent: number;
  insect_damage_percent: number;
  germinated_percent: number;
  bean_count_100g: number;
  bean_weight_100g: number;
  cadmium_level: number;
  batch_classification?: 'Bueno' | 'Regular' | 'Deficiente';
  sensory_scores: Record<string, number>;
  observations: string;
}

export interface QualityControlRecord {
  id: string;
  reception_id: string;
  qc_date: string;
  qc_time: string;
  pallets_quality: PalletQualityData[];
  created_at: string;
}

export interface PalletQualityData {
  paletaId: number;
  cuts: QualityCut[];
}

export interface QualityCut {
  humedad: string | number;
  fermentacion?: string | number;
  pizarros: string | number;
  negros: string | number;
  violetas: string | number;
  ligFerm?: string | number;
  moho: string | number;
  danadoIns: string | number;
  criollos?: string | number;
}

export interface MachineryMatrix {
  despedradora: { l1: boolean; l2: boolean };
  prelimpiadora: { l1: boolean; l2: boolean };
  byPass: { l1: boolean; l2: boolean };
  agregarMorocho: { l1: boolean; l2: boolean };
  zaranda: { l1: boolean; l2: boolean };
  densimetrica: { l1: boolean; l2: boolean };
  extraccionMi1: { l1: boolean; l2: boolean };
}

export interface EmptyingRecord {
  id: string;
  production_order_id: string;
  reception_code: string;
  guardiola_number: number;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  operator_name: string;
  total_weight_input: number;
  machinery_check: MachineryChecklist;
  status: string;
  observations: string;
  created_at?: string;
}

export interface MachineryChecklist {
  prelimpiadora: boolean;
  densimetrica: boolean;
  despedradora: boolean;
  zaranda: boolean;
  secadora: boolean;
}

export interface EmptyingDetail {
  id?: string;
  emptying_process_id?: string;
  reception_code: string;
  provider_name: string;
  group_name: string;
  weight_kg: number;
  sacks_qty?: number;
  discarded_sacks?: number;
  discarded_kg?: number;
}

export interface TraceabilityData {
  reception: Reception;
  purchaseOrder?: PurchaseOrder;

  // Partial receptions for multi-reception lots
  partialReceptions?: {
    reception_code: string;
    reception_date: string;
    weight_kg: number;
    proveedor: string;
  }[];

  qualityControl?: {
    id?: string;
    receptionId: string;
    receptionCode: string;
    qcDate?: string;
    qcTime?: string;
    palletsQuality?: PalletQualityData[];
    hasPhysical: boolean;
    hasSensory: boolean;
    hasDetailed: boolean;
  };

  // Sample tracking (Lab or Client)
  sample?: {
    id: string;
    sample_number: string;
    status: string;
    approval_status?: string;
    destination: 'LABORATORIO' | 'CLIENTE';
    result?: 'VIABLE' | 'INVIABLE' | 'APROBADA' | 'RECHAZADA';
    client?: string;
  };

  // Recipe associated with the lot
  recipe?: {
    id: string;
    recipe_code: string;
    client_name: string;
    status: string;
    ingredients_count: number;
  };

  relatedRecipes?: {
    id: string;
    recipeCode: string;
    clientName: string;
    status: string;
  }[];

  relatedProductionOrders?: {
    id?: string;
    serialNumber: string;
    status: string;
    startDate: string;
    fumigation: any;
    client?: string;
    recipeNumber?: string;
  }[];

  // Emptying process details
  emptyingProcess?: {
    id: string;
    guardiola_number: number;
    start_date: string;
    end_date?: string;
    total_weight_input: number;
    operator_name?: string;
    status: string;
  };

  emptyingBatches?: {
    id: string;
    guardiola_number: number;
    start_date: string;
    total_weight_input: number;
    operator_name?: string;
    status: string;
  }[];

  // Production batch report
  productionReport?: {
    id: string;
    report_date: string;
    pt_kg: number;
    pt_sacks: number;
    millito1_kg?: number;
    morocho_kg?: number;
    status: string;
    inventory_processed?: boolean;
    // Add missing fields for display
    millito1_sacks?: number;
    millito2_kg?: number;
    millito2_sacks?: number;
    pasilla_kg?: number;
    pasilla_sacks?: number;
    nibs_kg?: number;
    nibs_sacks?: number;
    morocho_sacks?: number;
    total_loss_kg?: number;
  };

  inventoryPT?: {
    code: string;
    kg: number;
    location?: string;
    hasSensory: boolean;
    classification: string;
  }[];

  // Maquila production data
  maquilaProduction?: {
    id: string;
    maquiladora_name: string;
    sent_date: string;
    sent_weight_kg: number;
    received_weight_kg?: number;
    transit_loss_kg?: number;
    status: string;
    dispatch_number?: string;
  };

  maquilaData?: {
    process: MaquilaProcess;
    returns: MaquilaReturn[];
  }[];

  // Logistics / Transport dispatch
  dispatchInfo?: {
    id: string;
    date: string;
    destination: string;
    status: string;
    unit?: string;
    driver?: string;
    service_type?: string;
    freight_cost_usd?: number;
    quantityKg?: number;
    quantitySacks?: number;
  };

  // COMEX / Export shipment
  exportInfo?: {
    id: string;
    booking: string;
    bl_number?: string;
    shipping_line?: string;
    container_type?: string;
    etd?: string;
    eta?: string;
    status: string;
    client_name?: string;
  };

  // Roadmap documents status
  roadmapDocs?: {
    total: number;
    completed: number;
    documents: { name: string; uploaded: boolean }[];
  };

  // Financial/NY Hedge info
  nyHedge?: {
    contract_id: string;
    hedge_status: string;
    fixed_price: number;
    month_ref: string;
    volume: number;
  };

  // Financial status
  financialInfo?: {
    client: string;
    contract_id?: string;
    status: string;
  };

  // Cobranza (collection) status
  cobranza?: Cobranza;

  // Backward traceability - ingredients used
  ingredients?: {
    reception_code: string;
    weight_kg: number;
    proveedor: string;
    purchase_order?: any;
  }[];
}

// Cobranza (Collection) tracking
export interface Cobranza {
  id: string;
  contract_id?: string;
  shipment_id?: string;
  lot_codes: string[];
  invoice_number?: string;
  invoice_date?: string;
  invoice_amount_usd?: number;
  payment_status: 'PENDIENTE' | 'FACTURADO' | 'COBRADO_PARCIAL' | 'COBRADO_TOTAL' | 'VENCIDO';
  payment_date?: string;
  payment_amount_usd?: number;
  payment_reference?: string;
  days_to_payment?: number;
  notes?: string;
  created_at?: string;
}

export interface MaquilaProcess {
  id: string;
  batch_code: string;
  maquiladora_name: string;
  sent_date: string;
  sent_weight_kg: number;
  received_date?: string;
  received_weight_kg?: number;
  transit_loss_kg?: number;
  reception_observations?: string;
  status: string;
  created_at?: string;

  // New fields for Refactor
  origin_warehouse?: string;
  logistics_status?: string;
  transport_unit_id?: string;
  transport_driver_id?: string;
  transport_route_id?: string;
  transport_cost_usd?: number;
  dispatch_number_csj?: string;
  cost_grain_usd?: number;
  humidity_sent?: number;
  humidity_received?: number;
  maquila_reception_number?: string;
  final_cost_usd?: number;
}

export interface MaquilaReturn {
  id: string;
  maquila_process_id: string;
  maquila_ref_number: string;
  registration_date: string;
  reception_id: string;
  product_type: string;
  lot_number: string;
  net_weight_kg: number;
  package_count: number;
  transit_loss_kg: number;
  observations: string;
  statusLabel?: string;
  locationLabel?: string;
}

export interface MaquilaInventory {
  id: string;
  corte: string;
  lote_number: string;
  tipo: 'Manteca' | 'Polvo' | 'Licor de Cacao' | 'Granos';
  production_date: string;
  available_kg: number;
  sales_cost_usd: number;
  availability_status: 'Disponible' | 'Reservado' | 'Agotado';
  raw_material_used_kg: number;
  finished_product_kg: number;
  created_at?: string;
  updated_at?: string;
}

export interface LabSampleDelivery {
  id?: string;
  code1: string;
  sample_code: string;
  request_date: string;
  provider: string;
  destination_country: string;
  product: string;
  varietal: string;
  quantity_kg: number;
  observation: string;
  determination: string;
  created_at?: string;
}

export interface NonCommercialItem {
  type: string;
  weight_g: number;
}

export interface PrimaryProductionRow {
  // Define fields if needed, currently used as any[] in DetailedQualityAnalysis
  [key: string]: any;
}

export interface SystemNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  target_roles: string[];
  link_to?: string;
  is_archived: boolean;
  read_by: string[];
  created_at: string;
}

export interface ExchangeRate {
  id: string;
  date: string;
  rate: number;
  source: string;
  currency_pair: string;
  created_at?: string;
}

export interface LogisticsPlanning {
  id: string;
  week: string;
  provider_name: string;
  zone: string;
  status: string;
  monday_kg: number;
  tuesday_kg: number;
  wednesday_kg: number;
  thursday_kg: number;
  friday_kg: number;
  saturday_kg: number;
  sunday_kg: number;
  total_kg: number;
  created_at?: string;
}

export interface WeeklyForecast {
  id: string;
  week: string;
  variety: string;
  provider_name: string;
  zone: string;
  kg_planned: number;
  unit_price_usd: number;
  total_usd?: number;
  status: string;
  created_at?: string;
}

export interface TransportDispatch {
  id: string;
  dispatch_date: string;
  service_type: 'Flete' | 'Acarreo' | 'Maquila';
  origin: string;
  destination: string;
  unit_id: string;
  driver_id: string;
  batch_code: string;
  quantity_kg: number;
  quantity_sacks: number;
  freight_cost_usd: number;
  status: string;
  export_shipment_id?: string;
  stevedore_provider_id?: string;
  stevedore_sacks_confirmed?: number;
  stevedore_rate_snapshot?: number;
  stevedore_approval_status?: string;
  kilometers?: number;
  created_at?: string;
}

export interface TransportUnit {
  id: string;
  plate_head: string;
  plate_trailer?: string;
  unit_type: string;
  capacity_kg: number;
  year_model?: string;
  brand?: string;
  color?: string;
  status: string;
  default_driver_id?: string;
}

export interface TransportDriver {
  id: string;
  full_name: string;
  doc_id: string;
  license_number: string;
  license_type: string;
  phone: string;
  email: string;
  status: string;
  documents_url?: string;
}

export interface NewBatchData {
  receptionCode: string;
  almacen: string;
  proveedor: string;
  productor: string;
  variety: string;
  tipo: string;
  placa: string;
  vehicle_type?: string;
  vehicle_brand?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  cedula: string;
  driverName?: string;
  procedencia: string;
  receptionDate: string;
  receptionTime: string;
  torre1: string | number;
  torre2: string | number;
  pesoTotalTorres: number;
  paletas: { id: number; peso: string | number; humedad: string | number; sacos0: string | number; sacos04: string | number; sacos06: string | number; sacos1: string | number; number_id: number }[];
  totalPesosPaletas: number;
  totalHumedad: number;
  humidityDeductionKg: number;
  totalSacos0: number;
  totalSacos04: number;
  totalSacos06: number;
  totalSacos1: number;
  totalDescuentoSacos: number;
  purchaseOrderId?: string;
}

export interface ProductionOrder {
  id?: string;
  serialNumber: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  variety: string;
  recipeNumber: string;
  client: string;
  batchNumber: string;
  artisanalCleaning: {
    granosPartidos: boolean;
    insectos: boolean;
    pequenos: boolean;
    morochos: boolean;
    pasilla: boolean;
    impurezas: boolean;
    otros: string;
  };
  visualSelection: {
    color: boolean;
    variedad: boolean;
    otros: string;
  };
  maintenance: {
    friccion: boolean;
    otro: string;
  };
  industrialCleaningHeader: {
    limpiezaPrevia: boolean;
    cambioOrganico: boolean;
    secadoMin: string;
    enfriadoMin: string;
    ensacadoTubo: boolean;
  };
  machinery: MachineryMatrix;
  sackType: string;
  sackCondition: string;
  sackObservations: string;
  fumigation: {
    enAlmacen: boolean;
    enGandola: boolean;
    fecha: string;
    hora: string;
  };
  observations: string;
}

export interface ProductionBatchResult {
  id: string;
  production_order_id: string;
  report_date: string;
  status: string;
  pt_kg: number;
  pt_sacks: number;
  millito1_kg: number;
  millito1_sacks: number;
  millito2_kg: number;
  millito2_sacks: number;
  pasilla_kg: number;
  pasilla_sacks: number;
  nibs_kg: number;
  nibs_sacks: number;
  morocho_kg: number;
  morocho_sacks: number;
  loss_stones: number;
  loss_shells: number;
  loss_cyclone: number;
  loss_cardboard: number;
  loss_iron: number;
  loss_dust: number;
  loss_intangible: number;
  observations: string;
  qa_signature: boolean;
  prod_signature: boolean;
  manager_signature: boolean;
  inventory_processed?: boolean;
  created_at?: string;
}

export interface PurchaseOrder {
  id: string;
  purchaseOrderDate: string;
  purchaseOrderTime: string;
  location: string;
  week: number;
  purchaseOrderReference: string;
  supplierName: string;
  identityNumber: string;
  receptionNumber?: string;
  variety: string;
  quality: string;
  kilosSolicitados: number;
  price: number;
  invoiceSupport: string;
  totalInvoice: number;
  status: string;
  kilosRecibidos?: number;
  originatingReceptionId?: string;
  originatingSurplusId?: string;
  exchangeRate?: number;
  is_multi_reception?: boolean;
  reception?: {
    flag_for_return?: boolean;
    return_kg?: number;
  };
}

export interface CocoaBatch {
  id: string;
  reception_code: string;
  reception_date: string;
  total_pesos_paletas: number;
  // Add other necessary fields if needed by InventoryTable or others
}

export interface SackTransaction {
  id: string;
  transaction_date: string;
  transaction_time: string;
  transaction_type: 'ENTREGA' | 'DEVOLUCION';
  provider_name: string;
  sacos_1: number;
  sacos_04: number;
  sacos_06: number;
  sacos_0: number;
  reference_doc?: string;
  notes?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address?: string;
  type: 'PROPIO' | 'MAQUILA';
  status: 'ACTIVO' | 'INACTIVO';
}

export interface LogisticsRate {
  id: string;
  service_type: string;
  rate_value: number;
  start_date: string;
  end_date?: string;
  status: 'Activa' | 'Histórica';
}

export interface StevedoreProvider {
  id: string;
  name: string;
  doc_id?: string;
  phone?: string;
  status: 'Activo' | 'Inactivo';
}

export interface LogisticsRoute {
  id: string;
  route_code: string;
  origin: string;
  destination: string;
  service_type: string;
  standard_km: number;
  status: 'Activa' | 'Inactiva';
}

export interface RouteCostHistory {
  id: string;
  route_id: string;
  fixed_cost_usd: number;
  start_date: string;
  end_date?: string;
}

export interface SystemLog {
  id: string;
  table_name: string;
  operation: string;
  record_id: string;
  old_data: any;
  new_data: any;
  changed_by: string;
  created_at: string;
  user_email?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  active: boolean;
}

export interface Client {
  id: string;
  name: string;
  abr?: string;
  country?: string;
  contact_name?: string;
  shipping_port?: string;
}

export interface NyHedge {
  id: string;
  contract_id: string;
  client_id: string;
  client_name: string;
  variety: string;
  volume_mt: number;
  status: 'Pendiente' | 'Abierta' | 'Cerrada';
  fixed_price: number;
  premium: number;
  final_price: number;
  future_month_ref: string;
  shipment_month_start: string;
  shipment_month_end: string;
  harvest: string;
  contract_status: string;
  reception_id?: string;
  date: string;
  month?: string;
  trade_id?: string;
  long_vol?: number;
  short_vol?: number;
  option_type?: string;
  market_price?: number;
  expiration_day?: string;
  expiration_result?: number;
  created_at?: string;
}

export interface SystemSetting {
  key: string;
  value: number;
  label: string;
  description: string;
  updated_at?: string;
}

export interface RiskSnapshot {
  id: string;
  snapshot_date: string;
  physical_inventory_mt: number;
  transit_inventory_mt: number;
  hedged_position_mt: number;
  fixed_contracts_mt: number;
  net_risk_mt: number;
  market_price: number;
  value_exposed: number;
  created_at?: string;
}

export interface SensoryAnalysis {
  id: string;
  reception_id: string;
  reception_code: string;
  analysis_date: string;
  panelists: PanelistData[];
  averages: Record<string, number>;
  observations: string;
}

export interface PanelistData {
  name: string;
  scores: Record<string, number>;
}

export interface SecurityEscort {
  id: string;
  name: string;
  company_name?: string;
  vehicle_plate?: string;
  vehicle_model?: string;
  phone_contact?: string;
  status: 'Activo' | 'Inactivo';
}

export interface PaymentOrder {
  id: string;
  payment_date: string;
  provider_name: string;
  amount_usd: number;
  amount_bs: number;
  exchange_rate: number;
  payment_method: string;
  status: 'Por Pagar' | 'Pagado' | 'Emitida' | 'Anulada';
  observations: string;
  bank_name?: string;
  reference_number?: string;
  receipt_url?: string;
  purchase_order_ids?: string[];
  created_at?: string;
}

export interface ExportShipment {
  id: string;
  booking_number: string;
  export_lot: string;
  status: string;
  container_type: string;
  port_loading: string;
  port_discharge: string;
  etd: string;
  eta: string;
  volume_mt: number;
  contract_id?: string;
  client_name?: string;
  shipping_line?: string;
  costs?: ExportCost[];
  created_at?: string;
}

export interface ExportCost {
  id: string;
  shipment_id: string;
  expense_type: string;
  cost_type: string;
  amount_usd: number;
  provider_name: string;
  status: string;
  invoice_number?: string;
  batch_number?: string;
  file_number?: string;
  departure_date?: string;
  shipping_line?: string;
  customs_broker?: string;
  document_url?: string;
  payment_order_id?: string;
}

export interface ComexSupply {
  id: string;
  name: string;
  unit: string;
  current_stock: number;
}

export interface NationalSale {
  id: string;
  batch_id: string;
  client_id: string;
  sale_date: string;
  price_per_kg: number;
  total_weight_kg: number;
  total_amount_usd: number;
  status: 'Reserved' | 'Dispatching' | 'Delivered' | 'Cancelled';
  notes?: string;

  // Joins
  reception?: Reception;
  client?: Client;
}

export interface ExportDocument {
  id: string;
  shipment_id: string;
  document_type: string;
  file_url: string;
  status: string;
  created_at: string;
}

export interface PettyCashTransaction {
  id: string;
  transaction_date: string;
  type: 'INGRESO' | 'EGRESO';
  amount: number;
  description: string;
  created_at: string;
}

export interface Fixation {
  id: string;
  date: string;
  month: string;
  trade_id: string;
  long_vol: number;
  short_vol: number;
  option_type: string;
  fixed_price: number;
  market_price: number;
  expiration_day: string;
  premium: number;
  expiration_result: number;
  created_at?: string;
}

export interface DispatchPallet {
  id: number;
  weight: string | number;
  sacks: number;
  humidity: string | number;
}

export interface Exportacion {
  id: string;
  export_code: string;
  export_date: string;
  contract_id?: string;
  shipment_id?: string;
  reception_id?: string;
  dispatch_id?: string;
  client_name: string;
  contract_number?: string;
  variety?: string;
  product_type?: string;
  lot_code?: string;
  volume_kg: number;
  volume_mt?: number; // Calculated
  sacks_count?: number;
  booking_number?: string;
  bl_number?: string;
  container_number?: string;
  vessel_name?: string;
  port_loading?: string;
  port_discharge?: string;
  etd?: string;
  eta?: string;
  unit_price_usd?: number;
  total_value_usd?: number;
  status: string;
  observations?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Client {
  id: string;
  name: string;
  abr?: string;
  country?: string;
  contact_name?: string;
  shipping_port?: string;
  max_cadmium?: number;
  created_at?: string;
}

export type WasteSourceType = 'CDP' | 'MAQUILA_TRANSIT' | 'MAQUILA_PROCESS' | 'GUARENAS' | 'TRASLADO';
export type WasteCategory = 'TANGIBLE' | 'INTANGIBLE' | 'TRANSITO' | 'PROCESO';

export interface WasteRegistryEntry {
  id: string;
  registration_date: string;
  source_type: WasteSourceType;
  source_reference_id?: string;
  source_reference_code?: string;
  waste_category: WasteCategory;
  waste_type: string;
  waste_kg: number;
  input_weight_kg?: number;
  waste_percentage?: number;
  observations?: string;
  is_auto_generated: boolean;
  created_by?: string;
  created_at?: string;
}


export interface CommercialAgreement {
  id: string;
  supplier_id: string;
  agreement_date: string;
  agreement_code: string;
  attention_to: string;
  position: string;
  company_name: string;
  rif: string;
  price_terms: string;
  volume_amount: number;
  volume_unit: string;
  payment_trigger: string;
  status: string;
  purchase_order_id?: string;
  created_at?: string;
  supplier?: { name: string }; // For join
}

// =============================================
// SENSORIAL COD-COD
// =============================================

export interface SensorialSession {
  id?: string;
  session_code?: string;       // Auto-generated: SCOD-001
  month_number: number;        // 1-12
  week_number: number;         // ISO week 1-53
  sequence_number?: number;
  status: 'BORRADOR' | 'COMPLETO';
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  panelist_1_id?: string;
  panelist_2_id?: string;
  panelist_3_id?: string;
}

export interface SensorialLot {
  id?: string;
  session_id?: string;
  reception_no: string;
  provider_name?: string;
  bags_qty: number;
  weight_kg: number;
  calc_percent: number;
  cadmium_level: number;
  unit_cost_usd: number;
  sort_order?: number;
  created_at?: string;
}

export interface SensorialEvaluation {
  id?: string;
  session_id?: string;
  lot_id?: string;
  panelist_slot: 1 | 2 | 3;
  panelist_user_id?: string;
  panelist_name: string;
  result?: 'SI' | 'NO' | 'MOM';
  description?: string;
  evaluated_at?: string;
}

// =============================================
// PALLET LOCATOR (BLE AoA)
// =============================================

export interface PalletBeacon {
  id?: string;
  pallet_number: number;
  batch_number?: string;
  beacon_mac: string;
  created_at?: string;
}

export interface CLEMapResponse {
  id: string;
  name: string;
  width: number;
  height: number;
  originPixelX: number;
  originPixelY: number;
  widthInPixels: number;
  heightInPixels: number;
  metersPerPixel: number;
}

export interface CLEModelBase64Response {
  base64: string;
}

export interface CLEBeacon {
  x: number;
  y: number;
  z: number;
  mapId: string;
  zoneId: string;
  updatedAt: number;
}

// =============================================
// SACK MANAGEMENT
// =============================================

export interface SackTransaction {
  id?: string;
  transaction_date: string;
  transaction_time?: string;
  transaction_type: 'ENTREGA' | 'DEVOLUCION';
  provider_name: string;
  sacos_0?: number;
  sacos_04?: number;
  sacos_06?: number;
  sacos_1?: number;
  reference_doc?: string;
  notes?: string;
  created_at?: string;
}


export interface NationalClient {
    id: string;
    name: string;
    rif?: string;
    address?: string;
    contact_name?: string;
    phone?: string;
    created_at?: string;
}
