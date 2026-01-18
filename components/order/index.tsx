import { LargeText, Body } from "ui/typography";
type objectProducts = {
  productName: string;
  quantity: number;
  updatedAt: Date;
  status: string;
  amount: number;
};
type OrderProps = {
  orderId: string;
  products: objectProducts[];
};
export function Order({ orderId, products }: OrderProps) {
  return (
    <div className="border-[3px] border-black rounded-[8px] w-[350px] px-[10px] pt-[15px] pb-[25px] flex flex-col gap-[10px]">
      <div>
        <LargeText>Orden: {orderId}</LargeText>
        <Body>Estado: {products[0].status}</Body>
      </div>
      <div>
        <ul className="list-disc ml-5 space-y-2">
          {products.map((p, index) => {
            return (
              <li key={index}>
                <Body>
                  {p.productName}, cant.: {p.quantity}
                </Body>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Body>Total: ${products[0].amount}</Body>
      </div>
      <Body>
        Ultima act.:{" "}
        {new Date(products[0].updatedAt).toLocaleString("es-AR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Body>
    </div>
  );
}
