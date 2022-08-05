import {useQuery, gql, useSubscription} from '@apollo/client';
import {ReactElement, useEffect, useRef, useState} from "react";
import {client} from "./index";

export default function App() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);
  return <Transfers />;
}

const TRANSFER_QUERY = gql`
    query Transfer($id: String!) {
        transfer(id: $id) {
            fromAddress
            toAddress
            denom
            quantity
        }
    }
`;

const TRANSFERS_SUBSCRIPTION = gql`
    subscription Transfers {
        transfers {
            id
        }
    }
`;

function Transfers(): ReactElement {
  const [transfers, setTransfers] = useState<TransferProps[]>([]);
  const { loading, error } = useSubscription(TRANSFERS_SUBSCRIPTION, {
    onSubscriptionData: async ({subscriptionData}) => {
      const id = subscriptionData.data.transfers.id;
      const {data, error} = await client.query({
        query: TRANSFER_QUERY,
        variables: {id},
      });
      if (error) {
        console.error(error);
        return;
      }
      const updated = [{id, date: new Date(), ...data.transfer}].concat(transfers);
      setTransfers(updated);
    },
  });
  if (error) console.error(error);
  return (
    <>
      <h1>Transfers</h1>
      {loading && 'Loading...'}
      {transfers.map((transfer) => <Transfer key={transfer.id} {...transfer} />)}
    </>
  );
}

type TransferProps = {
  readonly id: string;
  readonly date: Date;
  readonly fromAddress: string;
  readonly toAddress: string;
  readonly denom: string;
  readonly quantity: string;
};

function Transfer({ fromAddress, toAddress, denom, quantity, date, id }: TransferProps): ReactElement {
  const notified = useRef<string[]>([]);
  let action: string;
  if (toAddress === 'cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh') {
    action = '✅ Transfer to Leap Wallet - creating notification...';
    if (!notified.current.includes(id)) {
      notified.current.push(id);
      new Notification(`Received ${quantity} ${denom} from ${fromAddress}.`);
    }
  }
  else action = '❌ Transfer not to Leap Wallet - skipping notification';
  return (
    <div>
      Date: {date.toLocaleString()}
      <br />
      From address: {fromAddress}
      <br />
      To address: {toAddress}
      <br />
      {`Amount: ${quantity} ${denom}`}
      <br />
      {action}
      <hr />
    </div>
  );
}
