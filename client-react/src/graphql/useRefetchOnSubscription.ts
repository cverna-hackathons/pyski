import { useEffect, useRef } from 'react';
import { DocumentNode } from 'graphql';
import { graphql } from './index';

export const useRefetchOnSubscription = <PayloadType extends void>(
  subscription: DocumentNode,
  refetch: () => void,
  shouldRefetch?: (data?: PayloadType | null) => boolean,
): void => {
  const subscriptionRef = useRef(
    graphql
      .subscribe<PayloadType>({ query: subscription })
      .subscribe((result) => {
        if (shouldRefetch && !shouldRefetch(result.data)) {
          return;
        }

        refetch();
      }),
  );

  useEffect(
    () => () => {
      subscriptionRef.current.unsubscribe();
    },
    [],
  );
};
