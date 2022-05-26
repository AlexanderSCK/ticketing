import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div class="container">
      <h1>Ticketss</h1>
      <br></br>
      <div class="container">
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
