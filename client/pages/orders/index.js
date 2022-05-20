const OrderIndex = ({ orders }) => {
    return (
      <ul class="list-group">
        {orders.map((order) => {
          return (
            <li class="list-group-item" key={order.id}>
             <h3 class="mb-3">Ticket:</h3> <h4>{order.ticket.title}</h4>  Price: <h5>{order.ticket.price} Euro</h5> Status: {order.status}  | OrderId: {order.id}
            </li>
          );
        })}
      </ul>
    );
  };
  
  OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');
  
    return { orders: data };
  };
  
  export default OrderIndex;
  