type Pedido = {
  cliente: string;
  servicio: string;
  creadoEn: number;
};

const KEY = "pedido";

export function guardarPedido(cliente: string, servicio: string) {
  const pedido: Pedido = {
    cliente,
    servicio,
    creadoEn: Date.now(),
  };
  localStorage.setItem(KEY, JSON.stringify(pedido));
}

export function getPedido(): Pedido | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function eliminarPedido() {
  localStorage.removeItem(KEY);
}
