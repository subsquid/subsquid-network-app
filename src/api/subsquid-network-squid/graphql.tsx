/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: string; output: string };
  DateTime: { input: string; output: string };
};

export type Account = {
  __typename?: 'Account';
  balance: Scalars['BigInt']['output'];
  claimableDelegationCount: Scalars['Int']['output'];
  claims: Array<Claim>;
  delegations: Array<Delegation>;
  gatewayStakes: Array<GatewayStake>;
  gateways: Array<Gateway>;
  id: Scalars['String']['output'];
  owned: Array<Account>;
  owner?: Maybe<Account>;
  transfers: Array<AccountTransfer>;
  transfersFrom: Array<Transfer>;
  transfersTo: Array<Transfer>;
  type: AccountType;
  workers: Array<Worker>;
};

export type AccountClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimOrderByInput>>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type AccountDelegationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DelegationOrderByInput>>;
  where?: InputMaybe<DelegationWhereInput>;
};

export type AccountGatewayStakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayStakeOrderByInput>>;
  where?: InputMaybe<GatewayStakeWhereInput>;
};

export type AccountGatewaysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayOrderByInput>>;
  where?: InputMaybe<GatewayWhereInput>;
};

export type AccountOwnedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountTransferOrderByInput>>;
  where?: InputMaybe<AccountTransferWhereInput>;
};

export type AccountTransfersFromArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountTransfersToArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountWorkersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerOrderByInput>>;
  where?: InputMaybe<WorkerWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

export enum AccountOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ClaimableDelegationCountAsc = 'claimableDelegationCount_ASC',
  ClaimableDelegationCountAscNullsFirst = 'claimableDelegationCount_ASC_NULLS_FIRST',
  ClaimableDelegationCountAscNullsLast = 'claimableDelegationCount_ASC_NULLS_LAST',
  ClaimableDelegationCountDesc = 'claimableDelegationCount_DESC',
  ClaimableDelegationCountDescNullsFirst = 'claimableDelegationCount_DESC_NULLS_FIRST',
  ClaimableDelegationCountDescNullsLast = 'claimableDelegationCount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceAscNullsLast = 'owner_balance_ASC_NULLS_LAST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsFirst = 'owner_balance_DESC_NULLS_FIRST',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountAscNullsLast = 'owner_claimableDelegationCount_ASC_NULLS_LAST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsFirst = 'owner_claimableDelegationCount_DESC_NULLS_FIRST',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdAscNullsLast = 'owner_id_ASC_NULLS_LAST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsFirst = 'owner_id_DESC_NULLS_FIRST',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeAscNullsLast = 'owner_type_ASC_NULLS_LAST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsFirst = 'owner_type_DESC_NULLS_FIRST',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
}

export type AccountTransfer = {
  __typename?: 'AccountTransfer';
  account: Account;
  direction: TransferDirection;
  id: Scalars['String']['output'];
  transfer: Transfer;
};

export type AccountTransferEdge = {
  __typename?: 'AccountTransferEdge';
  cursor: Scalars['String']['output'];
  node: AccountTransfer;
};

export enum AccountTransferOrderByInput {
  AccountBalanceAsc = 'account_balance_ASC',
  AccountBalanceAscNullsFirst = 'account_balance_ASC_NULLS_FIRST',
  AccountBalanceAscNullsLast = 'account_balance_ASC_NULLS_LAST',
  AccountBalanceDesc = 'account_balance_DESC',
  AccountBalanceDescNullsFirst = 'account_balance_DESC_NULLS_FIRST',
  AccountBalanceDescNullsLast = 'account_balance_DESC_NULLS_LAST',
  AccountClaimableDelegationCountAsc = 'account_claimableDelegationCount_ASC',
  AccountClaimableDelegationCountAscNullsFirst = 'account_claimableDelegationCount_ASC_NULLS_FIRST',
  AccountClaimableDelegationCountAscNullsLast = 'account_claimableDelegationCount_ASC_NULLS_LAST',
  AccountClaimableDelegationCountDesc = 'account_claimableDelegationCount_DESC',
  AccountClaimableDelegationCountDescNullsFirst = 'account_claimableDelegationCount_DESC_NULLS_FIRST',
  AccountClaimableDelegationCountDescNullsLast = 'account_claimableDelegationCount_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountTypeAsc = 'account_type_ASC',
  AccountTypeAscNullsFirst = 'account_type_ASC_NULLS_FIRST',
  AccountTypeAscNullsLast = 'account_type_ASC_NULLS_LAST',
  AccountTypeDesc = 'account_type_DESC',
  AccountTypeDescNullsFirst = 'account_type_DESC_NULLS_FIRST',
  AccountTypeDescNullsLast = 'account_type_DESC_NULLS_LAST',
  DirectionAsc = 'direction_ASC',
  DirectionAscNullsFirst = 'direction_ASC_NULLS_FIRST',
  DirectionAscNullsLast = 'direction_ASC_NULLS_LAST',
  DirectionDesc = 'direction_DESC',
  DirectionDescNullsFirst = 'direction_DESC_NULLS_FIRST',
  DirectionDescNullsLast = 'direction_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TransferAmountAsc = 'transfer_amount_ASC',
  TransferAmountAscNullsFirst = 'transfer_amount_ASC_NULLS_FIRST',
  TransferAmountAscNullsLast = 'transfer_amount_ASC_NULLS_LAST',
  TransferAmountDesc = 'transfer_amount_DESC',
  TransferAmountDescNullsFirst = 'transfer_amount_DESC_NULLS_FIRST',
  TransferAmountDescNullsLast = 'transfer_amount_DESC_NULLS_LAST',
  TransferBlockNumberAsc = 'transfer_blockNumber_ASC',
  TransferBlockNumberAscNullsFirst = 'transfer_blockNumber_ASC_NULLS_FIRST',
  TransferBlockNumberAscNullsLast = 'transfer_blockNumber_ASC_NULLS_LAST',
  TransferBlockNumberDesc = 'transfer_blockNumber_DESC',
  TransferBlockNumberDescNullsFirst = 'transfer_blockNumber_DESC_NULLS_FIRST',
  TransferBlockNumberDescNullsLast = 'transfer_blockNumber_DESC_NULLS_LAST',
  TransferIdAsc = 'transfer_id_ASC',
  TransferIdAscNullsFirst = 'transfer_id_ASC_NULLS_FIRST',
  TransferIdAscNullsLast = 'transfer_id_ASC_NULLS_LAST',
  TransferIdDesc = 'transfer_id_DESC',
  TransferIdDescNullsFirst = 'transfer_id_DESC_NULLS_FIRST',
  TransferIdDescNullsLast = 'transfer_id_DESC_NULLS_LAST',
  TransferTimestampAsc = 'transfer_timestamp_ASC',
  TransferTimestampAscNullsFirst = 'transfer_timestamp_ASC_NULLS_FIRST',
  TransferTimestampAscNullsLast = 'transfer_timestamp_ASC_NULLS_LAST',
  TransferTimestampDesc = 'transfer_timestamp_DESC',
  TransferTimestampDescNullsFirst = 'transfer_timestamp_DESC_NULLS_FIRST',
  TransferTimestampDescNullsLast = 'transfer_timestamp_DESC_NULLS_LAST',
}

export type AccountTransferWhereInput = {
  AND?: InputMaybe<Array<AccountTransferWhereInput>>;
  OR?: InputMaybe<Array<AccountTransferWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  direction_eq?: InputMaybe<TransferDirection>;
  direction_in?: InputMaybe<Array<TransferDirection>>;
  direction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  direction_not_eq?: InputMaybe<TransferDirection>;
  direction_not_in?: InputMaybe<Array<TransferDirection>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  transfer?: InputMaybe<TransferWhereInput>;
  transfer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountTransfersConnection = {
  __typename?: 'AccountTransfersConnection';
  edges: Array<AccountTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum AccountType {
  User = 'USER',
  Vesting = 'VESTING',
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimableDelegationCount_eq?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  claimableDelegationCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimableDelegationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  claimableDelegationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  claims_every?: InputMaybe<ClaimWhereInput>;
  claims_none?: InputMaybe<ClaimWhereInput>;
  claims_some?: InputMaybe<ClaimWhereInput>;
  delegations_every?: InputMaybe<DelegationWhereInput>;
  delegations_none?: InputMaybe<DelegationWhereInput>;
  delegations_some?: InputMaybe<DelegationWhereInput>;
  gatewayStakes_every?: InputMaybe<GatewayStakeWhereInput>;
  gatewayStakes_none?: InputMaybe<GatewayStakeWhereInput>;
  gatewayStakes_some?: InputMaybe<GatewayStakeWhereInput>;
  gateways_every?: InputMaybe<GatewayWhereInput>;
  gateways_none?: InputMaybe<GatewayWhereInput>;
  gateways_some?: InputMaybe<GatewayWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  owned_every?: InputMaybe<AccountWhereInput>;
  owned_none?: InputMaybe<AccountWhereInput>;
  owned_some?: InputMaybe<AccountWhereInput>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transfersFrom_every?: InputMaybe<TransferWhereInput>;
  transfersFrom_none?: InputMaybe<TransferWhereInput>;
  transfersFrom_some?: InputMaybe<TransferWhereInput>;
  transfersTo_every?: InputMaybe<TransferWhereInput>;
  transfersTo_none?: InputMaybe<TransferWhereInput>;
  transfersTo_some?: InputMaybe<TransferWhereInput>;
  transfers_every?: InputMaybe<AccountTransferWhereInput>;
  transfers_none?: InputMaybe<AccountTransferWhereInput>;
  transfers_some?: InputMaybe<AccountTransferWhereInput>;
  type_eq?: InputMaybe<AccountType>;
  type_in?: InputMaybe<Array<AccountType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<AccountType>;
  type_not_in?: InputMaybe<Array<AccountType>>;
  workers_every?: InputMaybe<WorkerWhereInput>;
  workers_none?: InputMaybe<WorkerWhereInput>;
  workers_some?: InputMaybe<WorkerWhereInput>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AprSnapshot = {
  __typename?: 'AprSnapshot';
  stakerApr: Scalars['Float']['output'];
  timestamp: Scalars['DateTime']['output'];
  workerApr: Scalars['Float']['output'];
};

export type Block = {
  __typename?: 'Block';
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  l1BlockNumber: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

export enum BlockOrderByInput {
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashAscNullsLast = 'hash_ASC_NULLS_LAST',
  HashDesc = 'hash_DESC',
  HashDescNullsFirst = 'hash_DESC_NULLS_FIRST',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  HeightAsc = 'height_ASC',
  HeightAscNullsFirst = 'height_ASC_NULLS_FIRST',
  HeightAscNullsLast = 'height_ASC_NULLS_LAST',
  HeightDesc = 'height_DESC',
  HeightDescNullsFirst = 'height_DESC_NULLS_FIRST',
  HeightDescNullsLast = 'height_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  L1BlockNumberAsc = 'l1BlockNumber_ASC',
  L1BlockNumberAscNullsFirst = 'l1BlockNumber_ASC_NULLS_FIRST',
  L1BlockNumberAscNullsLast = 'l1BlockNumber_ASC_NULLS_LAST',
  L1BlockNumberDesc = 'l1BlockNumber_DESC',
  L1BlockNumberDescNullsFirst = 'l1BlockNumber_DESC_NULLS_FIRST',
  L1BlockNumberDescNullsLast = 'l1BlockNumber_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
  height_eq?: InputMaybe<Scalars['Int']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not_eq?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  l1BlockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  l1BlockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  l1BlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  l1BlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Claim = {
  __typename?: 'Claim';
  /** worker.realOwner or delegation.realOwner */
  account: Account;
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  delegation?: Maybe<Delegation>;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  type: ClaimType;
  worker?: Maybe<Worker>;
};

export type ClaimEdge = {
  __typename?: 'ClaimEdge';
  cursor: Scalars['String']['output'];
  node: Claim;
};

export enum ClaimOrderByInput {
  AccountBalanceAsc = 'account_balance_ASC',
  AccountBalanceAscNullsFirst = 'account_balance_ASC_NULLS_FIRST',
  AccountBalanceAscNullsLast = 'account_balance_ASC_NULLS_LAST',
  AccountBalanceDesc = 'account_balance_DESC',
  AccountBalanceDescNullsFirst = 'account_balance_DESC_NULLS_FIRST',
  AccountBalanceDescNullsLast = 'account_balance_DESC_NULLS_LAST',
  AccountClaimableDelegationCountAsc = 'account_claimableDelegationCount_ASC',
  AccountClaimableDelegationCountAscNullsFirst = 'account_claimableDelegationCount_ASC_NULLS_FIRST',
  AccountClaimableDelegationCountAscNullsLast = 'account_claimableDelegationCount_ASC_NULLS_LAST',
  AccountClaimableDelegationCountDesc = 'account_claimableDelegationCount_DESC',
  AccountClaimableDelegationCountDescNullsFirst = 'account_claimableDelegationCount_DESC_NULLS_FIRST',
  AccountClaimableDelegationCountDescNullsLast = 'account_claimableDelegationCount_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountTypeAsc = 'account_type_ASC',
  AccountTypeAscNullsFirst = 'account_type_ASC_NULLS_FIRST',
  AccountTypeAscNullsLast = 'account_type_ASC_NULLS_LAST',
  AccountTypeDesc = 'account_type_DESC',
  AccountTypeDescNullsFirst = 'account_type_DESC_NULLS_FIRST',
  AccountTypeDescNullsLast = 'account_type_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DelegationClaimableRewardAsc = 'delegation_claimableReward_ASC',
  DelegationClaimableRewardAscNullsFirst = 'delegation_claimableReward_ASC_NULLS_FIRST',
  DelegationClaimableRewardAscNullsLast = 'delegation_claimableReward_ASC_NULLS_LAST',
  DelegationClaimableRewardDesc = 'delegation_claimableReward_DESC',
  DelegationClaimableRewardDescNullsFirst = 'delegation_claimableReward_DESC_NULLS_FIRST',
  DelegationClaimableRewardDescNullsLast = 'delegation_claimableReward_DESC_NULLS_LAST',
  DelegationClaimedRewardAsc = 'delegation_claimedReward_ASC',
  DelegationClaimedRewardAscNullsFirst = 'delegation_claimedReward_ASC_NULLS_FIRST',
  DelegationClaimedRewardAscNullsLast = 'delegation_claimedReward_ASC_NULLS_LAST',
  DelegationClaimedRewardDesc = 'delegation_claimedReward_DESC',
  DelegationClaimedRewardDescNullsFirst = 'delegation_claimedReward_DESC_NULLS_FIRST',
  DelegationClaimedRewardDescNullsLast = 'delegation_claimedReward_DESC_NULLS_LAST',
  DelegationDepositAsc = 'delegation_deposit_ASC',
  DelegationDepositAscNullsFirst = 'delegation_deposit_ASC_NULLS_FIRST',
  DelegationDepositAscNullsLast = 'delegation_deposit_ASC_NULLS_LAST',
  DelegationDepositDesc = 'delegation_deposit_DESC',
  DelegationDepositDescNullsFirst = 'delegation_deposit_DESC_NULLS_FIRST',
  DelegationDepositDescNullsLast = 'delegation_deposit_DESC_NULLS_LAST',
  DelegationIdAsc = 'delegation_id_ASC',
  DelegationIdAscNullsFirst = 'delegation_id_ASC_NULLS_FIRST',
  DelegationIdAscNullsLast = 'delegation_id_ASC_NULLS_LAST',
  DelegationIdDesc = 'delegation_id_DESC',
  DelegationIdDescNullsFirst = 'delegation_id_DESC_NULLS_FIRST',
  DelegationIdDescNullsLast = 'delegation_id_DESC_NULLS_LAST',
  DelegationLockEndAsc = 'delegation_lockEnd_ASC',
  DelegationLockEndAscNullsFirst = 'delegation_lockEnd_ASC_NULLS_FIRST',
  DelegationLockEndAscNullsLast = 'delegation_lockEnd_ASC_NULLS_LAST',
  DelegationLockEndDesc = 'delegation_lockEnd_DESC',
  DelegationLockEndDescNullsFirst = 'delegation_lockEnd_DESC_NULLS_FIRST',
  DelegationLockEndDescNullsLast = 'delegation_lockEnd_DESC_NULLS_LAST',
  DelegationLockStartAsc = 'delegation_lockStart_ASC',
  DelegationLockStartAscNullsFirst = 'delegation_lockStart_ASC_NULLS_FIRST',
  DelegationLockStartAscNullsLast = 'delegation_lockStart_ASC_NULLS_LAST',
  DelegationLockStartDesc = 'delegation_lockStart_DESC',
  DelegationLockStartDescNullsFirst = 'delegation_lockStart_DESC_NULLS_FIRST',
  DelegationLockStartDescNullsLast = 'delegation_lockStart_DESC_NULLS_LAST',
  DelegationLockedAsc = 'delegation_locked_ASC',
  DelegationLockedAscNullsFirst = 'delegation_locked_ASC_NULLS_FIRST',
  DelegationLockedAscNullsLast = 'delegation_locked_ASC_NULLS_LAST',
  DelegationLockedDesc = 'delegation_locked_DESC',
  DelegationLockedDescNullsFirst = 'delegation_locked_DESC_NULLS_FIRST',
  DelegationLockedDescNullsLast = 'delegation_locked_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprAscNullsLast = 'worker_apr_ASC_NULLS_LAST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsFirst = 'worker_apr_DESC_NULLS_FIRST',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondAscNullsLast = 'worker_bond_ASC_NULLS_LAST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsFirst = 'worker_bond_DESC_NULLS_FIRST',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerCapedDelegationAsc = 'worker_capedDelegation_ASC',
  WorkerCapedDelegationAscNullsFirst = 'worker_capedDelegation_ASC_NULLS_FIRST',
  WorkerCapedDelegationAscNullsLast = 'worker_capedDelegation_ASC_NULLS_LAST',
  WorkerCapedDelegationDesc = 'worker_capedDelegation_DESC',
  WorkerCapedDelegationDescNullsFirst = 'worker_capedDelegation_DESC_NULLS_FIRST',
  WorkerCapedDelegationDescNullsLast = 'worker_capedDelegation_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardAscNullsLast = 'worker_claimableReward_ASC_NULLS_LAST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsFirst = 'worker_claimableReward_DESC_NULLS_FIRST',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardAscNullsLast = 'worker_claimedReward_ASC_NULLS_LAST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsFirst = 'worker_claimedReward_DESC_NULLS_FIRST',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtAscNullsLast = 'worker_createdAt_ASC_NULLS_LAST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsFirst = 'worker_createdAt_DESC_NULLS_FIRST',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDTenureAsc = 'worker_dTenure_ASC',
  WorkerDTenureAscNullsFirst = 'worker_dTenure_ASC_NULLS_FIRST',
  WorkerDTenureAscNullsLast = 'worker_dTenure_ASC_NULLS_LAST',
  WorkerDTenureDesc = 'worker_dTenure_DESC',
  WorkerDTenureDescNullsFirst = 'worker_dTenure_DESC_NULLS_FIRST',
  WorkerDTenureDescNullsLast = 'worker_dTenure_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountAscNullsLast = 'worker_delegationCount_ASC_NULLS_LAST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsFirst = 'worker_delegationCount_DESC_NULLS_FIRST',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionAscNullsLast = 'worker_description_ASC_NULLS_LAST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsFirst = 'worker_description_DESC_NULLS_FIRST',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkAscNullsLast = 'worker_dialOk_ASC_NULLS_LAST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsFirst = 'worker_dialOk_DESC_NULLS_FIRST',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailAscNullsLast = 'worker_email_ASC_NULLS_LAST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsFirst = 'worker_email_DESC_NULLS_FIRST',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailReasonAsc = 'worker_jailReason_ASC',
  WorkerJailReasonAscNullsFirst = 'worker_jailReason_ASC_NULLS_FIRST',
  WorkerJailReasonAscNullsLast = 'worker_jailReason_ASC_NULLS_LAST',
  WorkerJailReasonDesc = 'worker_jailReason_DESC',
  WorkerJailReasonDescNullsFirst = 'worker_jailReason_DESC_NULLS_FIRST',
  WorkerJailReasonDescNullsLast = 'worker_jailReason_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedAscNullsLast = 'worker_jailed_ASC_NULLS_LAST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsFirst = 'worker_jailed_DESC_NULLS_FIRST',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLivenessAsc = 'worker_liveness_ASC',
  WorkerLivenessAscNullsFirst = 'worker_liveness_ASC_NULLS_FIRST',
  WorkerLivenessAscNullsLast = 'worker_liveness_ASC_NULLS_LAST',
  WorkerLivenessDesc = 'worker_liveness_DESC',
  WorkerLivenessDescNullsFirst = 'worker_liveness_DESC_NULLS_FIRST',
  WorkerLivenessDescNullsLast = 'worker_liveness_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndAscNullsLast = 'worker_lockEnd_ASC_NULLS_LAST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsFirst = 'worker_lockEnd_DESC_NULLS_FIRST',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartAscNullsLast = 'worker_lockStart_ASC_NULLS_LAST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsFirst = 'worker_lockStart_DESC_NULLS_FIRST',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedAscNullsLast = 'worker_locked_ASC_NULLS_LAST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsFirst = 'worker_locked_DESC_NULLS_FIRST',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameAscNullsLast = 'worker_name_ASC_NULLS_LAST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsFirst = 'worker_name_DESC_NULLS_FIRST',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineAscNullsLast = 'worker_online_ASC_NULLS_LAST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsFirst = 'worker_online_DESC_NULLS_FIRST',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdAscNullsLast = 'worker_peerId_ASC_NULLS_LAST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsFirst = 'worker_peerId_DESC_NULLS_FIRST',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursAscNullsLast = 'worker_queries24Hours_ASC_NULLS_LAST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsFirst = 'worker_queries24Hours_DESC_NULLS_FIRST',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysAscNullsLast = 'worker_queries90Days_ASC_NULLS_LAST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsFirst = 'worker_queries90Days_DESC_NULLS_FIRST',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursAscNullsLast = 'worker_scannedData24Hours_ASC_NULLS_LAST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsFirst = 'worker_scannedData24Hours_DESC_NULLS_FIRST',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysAscNullsLast = 'worker_scannedData90Days_ASC_NULLS_LAST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsFirst = 'worker_scannedData90Days_DESC_NULLS_FIRST',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursAscNullsLast = 'worker_servedData24Hours_ASC_NULLS_LAST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsFirst = 'worker_servedData24Hours_DESC_NULLS_FIRST',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysAscNullsLast = 'worker_servedData90Days_ASC_NULLS_LAST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsFirst = 'worker_servedData90Days_DESC_NULLS_FIRST',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprAscNullsLast = 'worker_stakerApr_ASC_NULLS_LAST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsFirst = 'worker_stakerApr_DESC_NULLS_FIRST',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusAscNullsLast = 'worker_status_ASC_NULLS_LAST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsFirst = 'worker_status_DESC_NULLS_FIRST',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataAscNullsLast = 'worker_storedData_ASC_NULLS_LAST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsFirst = 'worker_storedData_DESC_NULLS_FIRST',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationRewardsAsc = 'worker_totalDelegationRewards_ASC',
  WorkerTotalDelegationRewardsAscNullsFirst = 'worker_totalDelegationRewards_ASC_NULLS_FIRST',
  WorkerTotalDelegationRewardsAscNullsLast = 'worker_totalDelegationRewards_ASC_NULLS_LAST',
  WorkerTotalDelegationRewardsDesc = 'worker_totalDelegationRewards_DESC',
  WorkerTotalDelegationRewardsDescNullsFirst = 'worker_totalDelegationRewards_DESC_NULLS_FIRST',
  WorkerTotalDelegationRewardsDescNullsLast = 'worker_totalDelegationRewards_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationAscNullsLast = 'worker_totalDelegation_ASC_NULLS_LAST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsFirst = 'worker_totalDelegation_DESC_NULLS_FIRST',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerTrafficWeightAsc = 'worker_trafficWeight_ASC',
  WorkerTrafficWeightAscNullsFirst = 'worker_trafficWeight_ASC_NULLS_FIRST',
  WorkerTrafficWeightAscNullsLast = 'worker_trafficWeight_ASC_NULLS_LAST',
  WorkerTrafficWeightDesc = 'worker_trafficWeight_DESC',
  WorkerTrafficWeightDescNullsFirst = 'worker_trafficWeight_DESC_NULLS_FIRST',
  WorkerTrafficWeightDescNullsLast = 'worker_trafficWeight_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursAscNullsLast = 'worker_uptime24Hours_ASC_NULLS_LAST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsFirst = 'worker_uptime24Hours_DESC_NULLS_FIRST',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysAscNullsLast = 'worker_uptime90Days_ASC_NULLS_LAST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsFirst = 'worker_uptime90Days_DESC_NULLS_FIRST',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionAscNullsLast = 'worker_version_ASC_NULLS_LAST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsFirst = 'worker_version_DESC_NULLS_FIRST',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteAscNullsLast = 'worker_website_ASC_NULLS_LAST',
  WorkerWebsiteDesc = 'worker_website_DESC',
  WorkerWebsiteDescNullsFirst = 'worker_website_DESC_NULLS_FIRST',
  WorkerWebsiteDescNullsLast = 'worker_website_DESC_NULLS_LAST',
}

export enum ClaimType {
  Delegation = 'DELEGATION',
  Worker = 'WORKER',
}

export type ClaimWhereInput = {
  AND?: InputMaybe<Array<ClaimWhereInput>>;
  OR?: InputMaybe<Array<ClaimWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegation?: InputMaybe<DelegationWhereInput>;
  delegation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  type_eq?: InputMaybe<ClaimType>;
  type_in?: InputMaybe<Array<ClaimType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<ClaimType>;
  type_not_in?: InputMaybe<Array<ClaimType>>;
  worker?: InputMaybe<WorkerWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ClaimsConnection = {
  __typename?: 'ClaimsConnection';
  edges: Array<ClaimEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Commitment = {
  __typename?: 'Commitment';
  from: Scalars['DateTime']['output'];
  fromBlock: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  recipients: Array<CommitmentRecipient>;
  to: Scalars['DateTime']['output'];
  toBlock: Scalars['Int']['output'];
};

export type CommitmentEdge = {
  __typename?: 'CommitmentEdge';
  cursor: Scalars['String']['output'];
  node: Commitment;
};

export enum CommitmentOrderByInput {
  FromBlockAsc = 'fromBlock_ASC',
  FromBlockAscNullsFirst = 'fromBlock_ASC_NULLS_FIRST',
  FromBlockAscNullsLast = 'fromBlock_ASC_NULLS_LAST',
  FromBlockDesc = 'fromBlock_DESC',
  FromBlockDescNullsFirst = 'fromBlock_DESC_NULLS_FIRST',
  FromBlockDescNullsLast = 'fromBlock_DESC_NULLS_LAST',
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromAscNullsLast = 'from_ASC_NULLS_LAST',
  FromDesc = 'from_DESC',
  FromDescNullsFirst = 'from_DESC_NULLS_FIRST',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ToBlockAsc = 'toBlock_ASC',
  ToBlockAscNullsFirst = 'toBlock_ASC_NULLS_FIRST',
  ToBlockAscNullsLast = 'toBlock_ASC_NULLS_LAST',
  ToBlockDesc = 'toBlock_DESC',
  ToBlockDescNullsFirst = 'toBlock_DESC_NULLS_FIRST',
  ToBlockDescNullsLast = 'toBlock_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToAscNullsLast = 'to_ASC_NULLS_LAST',
  ToDesc = 'to_DESC',
  ToDescNullsFirst = 'to_DESC_NULLS_FIRST',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
}

export type CommitmentRecipient = {
  __typename?: 'CommitmentRecipient';
  stakerApr: Scalars['Float']['output'];
  stakerReward: Scalars['BigInt']['output'];
  workerApr: Scalars['Float']['output'];
  workerId: Scalars['String']['output'];
  workerReward: Scalars['BigInt']['output'];
};

export type CommitmentWhereInput = {
  AND?: InputMaybe<Array<CommitmentWhereInput>>;
  OR?: InputMaybe<Array<CommitmentWhereInput>>;
  fromBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  fromBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  from_eq?: InputMaybe<Scalars['DateTime']['input']>;
  from_gt?: InputMaybe<Scalars['DateTime']['input']>;
  from_gte?: InputMaybe<Scalars['DateTime']['input']>;
  from_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['DateTime']['input']>;
  from_lte?: InputMaybe<Scalars['DateTime']['input']>;
  from_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  recipients_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  toBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  toBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  toBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  toBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  toBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  toBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  toBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  to_eq?: InputMaybe<Scalars['DateTime']['input']>;
  to_gt?: InputMaybe<Scalars['DateTime']['input']>;
  to_gte?: InputMaybe<Scalars['DateTime']['input']>;
  to_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['DateTime']['input']>;
  to_lte?: InputMaybe<Scalars['DateTime']['input']>;
  to_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type CommitmentsConnection = {
  __typename?: 'CommitmentsConnection';
  edges: Array<CommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Delegation = {
  __typename?: 'Delegation';
  claimableReward: Scalars['BigInt']['output'];
  claimedReward: Scalars['BigInt']['output'];
  claims: Array<Claim>;
  deposit: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lockEnd?: Maybe<Scalars['Int']['output']>;
  lockStart?: Maybe<Scalars['Int']['output']>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  owner: Account;
  /** owner.owner for VESTING account */
  realOwner: Account;
  rewards: Array<DelegationReward>;
  worker: Worker;
};

export type DelegationClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimOrderByInput>>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type DelegationRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DelegationRewardOrderByInput>>;
  where?: InputMaybe<DelegationRewardWhereInput>;
};

export type DelegationEdge = {
  __typename?: 'DelegationEdge';
  cursor: Scalars['String']['output'];
  node: Delegation;
};

export enum DelegationOrderByInput {
  ClaimableRewardAsc = 'claimableReward_ASC',
  ClaimableRewardAscNullsFirst = 'claimableReward_ASC_NULLS_FIRST',
  ClaimableRewardAscNullsLast = 'claimableReward_ASC_NULLS_LAST',
  ClaimableRewardDesc = 'claimableReward_DESC',
  ClaimableRewardDescNullsFirst = 'claimableReward_DESC_NULLS_FIRST',
  ClaimableRewardDescNullsLast = 'claimableReward_DESC_NULLS_LAST',
  ClaimedRewardAsc = 'claimedReward_ASC',
  ClaimedRewardAscNullsFirst = 'claimedReward_ASC_NULLS_FIRST',
  ClaimedRewardAscNullsLast = 'claimedReward_ASC_NULLS_LAST',
  ClaimedRewardDesc = 'claimedReward_DESC',
  ClaimedRewardDescNullsFirst = 'claimedReward_DESC_NULLS_FIRST',
  ClaimedRewardDescNullsLast = 'claimedReward_DESC_NULLS_LAST',
  DepositAsc = 'deposit_ASC',
  DepositAscNullsFirst = 'deposit_ASC_NULLS_FIRST',
  DepositAscNullsLast = 'deposit_ASC_NULLS_LAST',
  DepositDesc = 'deposit_DESC',
  DepositDescNullsFirst = 'deposit_DESC_NULLS_FIRST',
  DepositDescNullsLast = 'deposit_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndAscNullsLast = 'lockEnd_ASC_NULLS_LAST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsFirst = 'lockEnd_DESC_NULLS_FIRST',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartAscNullsLast = 'lockStart_ASC_NULLS_LAST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsFirst = 'lockStart_DESC_NULLS_FIRST',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedAscNullsLast = 'locked_ASC_NULLS_LAST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsFirst = 'locked_DESC_NULLS_FIRST',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceAscNullsLast = 'owner_balance_ASC_NULLS_LAST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsFirst = 'owner_balance_DESC_NULLS_FIRST',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountAscNullsLast = 'owner_claimableDelegationCount_ASC_NULLS_LAST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsFirst = 'owner_claimableDelegationCount_DESC_NULLS_FIRST',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdAscNullsLast = 'owner_id_ASC_NULLS_LAST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsFirst = 'owner_id_DESC_NULLS_FIRST',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeAscNullsLast = 'owner_type_ASC_NULLS_LAST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsFirst = 'owner_type_DESC_NULLS_FIRST',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceAscNullsLast = 'realOwner_balance_ASC_NULLS_LAST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsFirst = 'realOwner_balance_DESC_NULLS_FIRST',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountAscNullsLast = 'realOwner_claimableDelegationCount_ASC_NULLS_LAST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsFirst = 'realOwner_claimableDelegationCount_DESC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdAscNullsLast = 'realOwner_id_ASC_NULLS_LAST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsFirst = 'realOwner_id_DESC_NULLS_FIRST',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeAscNullsLast = 'realOwner_type_ASC_NULLS_LAST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsFirst = 'realOwner_type_DESC_NULLS_FIRST',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprAscNullsLast = 'worker_apr_ASC_NULLS_LAST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsFirst = 'worker_apr_DESC_NULLS_FIRST',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondAscNullsLast = 'worker_bond_ASC_NULLS_LAST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsFirst = 'worker_bond_DESC_NULLS_FIRST',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerCapedDelegationAsc = 'worker_capedDelegation_ASC',
  WorkerCapedDelegationAscNullsFirst = 'worker_capedDelegation_ASC_NULLS_FIRST',
  WorkerCapedDelegationAscNullsLast = 'worker_capedDelegation_ASC_NULLS_LAST',
  WorkerCapedDelegationDesc = 'worker_capedDelegation_DESC',
  WorkerCapedDelegationDescNullsFirst = 'worker_capedDelegation_DESC_NULLS_FIRST',
  WorkerCapedDelegationDescNullsLast = 'worker_capedDelegation_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardAscNullsLast = 'worker_claimableReward_ASC_NULLS_LAST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsFirst = 'worker_claimableReward_DESC_NULLS_FIRST',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardAscNullsLast = 'worker_claimedReward_ASC_NULLS_LAST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsFirst = 'worker_claimedReward_DESC_NULLS_FIRST',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtAscNullsLast = 'worker_createdAt_ASC_NULLS_LAST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsFirst = 'worker_createdAt_DESC_NULLS_FIRST',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDTenureAsc = 'worker_dTenure_ASC',
  WorkerDTenureAscNullsFirst = 'worker_dTenure_ASC_NULLS_FIRST',
  WorkerDTenureAscNullsLast = 'worker_dTenure_ASC_NULLS_LAST',
  WorkerDTenureDesc = 'worker_dTenure_DESC',
  WorkerDTenureDescNullsFirst = 'worker_dTenure_DESC_NULLS_FIRST',
  WorkerDTenureDescNullsLast = 'worker_dTenure_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountAscNullsLast = 'worker_delegationCount_ASC_NULLS_LAST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsFirst = 'worker_delegationCount_DESC_NULLS_FIRST',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionAscNullsLast = 'worker_description_ASC_NULLS_LAST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsFirst = 'worker_description_DESC_NULLS_FIRST',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkAscNullsLast = 'worker_dialOk_ASC_NULLS_LAST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsFirst = 'worker_dialOk_DESC_NULLS_FIRST',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailAscNullsLast = 'worker_email_ASC_NULLS_LAST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsFirst = 'worker_email_DESC_NULLS_FIRST',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailReasonAsc = 'worker_jailReason_ASC',
  WorkerJailReasonAscNullsFirst = 'worker_jailReason_ASC_NULLS_FIRST',
  WorkerJailReasonAscNullsLast = 'worker_jailReason_ASC_NULLS_LAST',
  WorkerJailReasonDesc = 'worker_jailReason_DESC',
  WorkerJailReasonDescNullsFirst = 'worker_jailReason_DESC_NULLS_FIRST',
  WorkerJailReasonDescNullsLast = 'worker_jailReason_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedAscNullsLast = 'worker_jailed_ASC_NULLS_LAST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsFirst = 'worker_jailed_DESC_NULLS_FIRST',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLivenessAsc = 'worker_liveness_ASC',
  WorkerLivenessAscNullsFirst = 'worker_liveness_ASC_NULLS_FIRST',
  WorkerLivenessAscNullsLast = 'worker_liveness_ASC_NULLS_LAST',
  WorkerLivenessDesc = 'worker_liveness_DESC',
  WorkerLivenessDescNullsFirst = 'worker_liveness_DESC_NULLS_FIRST',
  WorkerLivenessDescNullsLast = 'worker_liveness_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndAscNullsLast = 'worker_lockEnd_ASC_NULLS_LAST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsFirst = 'worker_lockEnd_DESC_NULLS_FIRST',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartAscNullsLast = 'worker_lockStart_ASC_NULLS_LAST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsFirst = 'worker_lockStart_DESC_NULLS_FIRST',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedAscNullsLast = 'worker_locked_ASC_NULLS_LAST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsFirst = 'worker_locked_DESC_NULLS_FIRST',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameAscNullsLast = 'worker_name_ASC_NULLS_LAST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsFirst = 'worker_name_DESC_NULLS_FIRST',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineAscNullsLast = 'worker_online_ASC_NULLS_LAST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsFirst = 'worker_online_DESC_NULLS_FIRST',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdAscNullsLast = 'worker_peerId_ASC_NULLS_LAST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsFirst = 'worker_peerId_DESC_NULLS_FIRST',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursAscNullsLast = 'worker_queries24Hours_ASC_NULLS_LAST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsFirst = 'worker_queries24Hours_DESC_NULLS_FIRST',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysAscNullsLast = 'worker_queries90Days_ASC_NULLS_LAST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsFirst = 'worker_queries90Days_DESC_NULLS_FIRST',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursAscNullsLast = 'worker_scannedData24Hours_ASC_NULLS_LAST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsFirst = 'worker_scannedData24Hours_DESC_NULLS_FIRST',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysAscNullsLast = 'worker_scannedData90Days_ASC_NULLS_LAST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsFirst = 'worker_scannedData90Days_DESC_NULLS_FIRST',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursAscNullsLast = 'worker_servedData24Hours_ASC_NULLS_LAST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsFirst = 'worker_servedData24Hours_DESC_NULLS_FIRST',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysAscNullsLast = 'worker_servedData90Days_ASC_NULLS_LAST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsFirst = 'worker_servedData90Days_DESC_NULLS_FIRST',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprAscNullsLast = 'worker_stakerApr_ASC_NULLS_LAST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsFirst = 'worker_stakerApr_DESC_NULLS_FIRST',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusAscNullsLast = 'worker_status_ASC_NULLS_LAST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsFirst = 'worker_status_DESC_NULLS_FIRST',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataAscNullsLast = 'worker_storedData_ASC_NULLS_LAST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsFirst = 'worker_storedData_DESC_NULLS_FIRST',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationRewardsAsc = 'worker_totalDelegationRewards_ASC',
  WorkerTotalDelegationRewardsAscNullsFirst = 'worker_totalDelegationRewards_ASC_NULLS_FIRST',
  WorkerTotalDelegationRewardsAscNullsLast = 'worker_totalDelegationRewards_ASC_NULLS_LAST',
  WorkerTotalDelegationRewardsDesc = 'worker_totalDelegationRewards_DESC',
  WorkerTotalDelegationRewardsDescNullsFirst = 'worker_totalDelegationRewards_DESC_NULLS_FIRST',
  WorkerTotalDelegationRewardsDescNullsLast = 'worker_totalDelegationRewards_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationAscNullsLast = 'worker_totalDelegation_ASC_NULLS_LAST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsFirst = 'worker_totalDelegation_DESC_NULLS_FIRST',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerTrafficWeightAsc = 'worker_trafficWeight_ASC',
  WorkerTrafficWeightAscNullsFirst = 'worker_trafficWeight_ASC_NULLS_FIRST',
  WorkerTrafficWeightAscNullsLast = 'worker_trafficWeight_ASC_NULLS_LAST',
  WorkerTrafficWeightDesc = 'worker_trafficWeight_DESC',
  WorkerTrafficWeightDescNullsFirst = 'worker_trafficWeight_DESC_NULLS_FIRST',
  WorkerTrafficWeightDescNullsLast = 'worker_trafficWeight_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursAscNullsLast = 'worker_uptime24Hours_ASC_NULLS_LAST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsFirst = 'worker_uptime24Hours_DESC_NULLS_FIRST',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysAscNullsLast = 'worker_uptime90Days_ASC_NULLS_LAST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsFirst = 'worker_uptime90Days_DESC_NULLS_FIRST',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionAscNullsLast = 'worker_version_ASC_NULLS_LAST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsFirst = 'worker_version_DESC_NULLS_FIRST',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteAscNullsLast = 'worker_website_ASC_NULLS_LAST',
  WorkerWebsiteDesc = 'worker_website_DESC',
  WorkerWebsiteDescNullsFirst = 'worker_website_DESC_NULLS_FIRST',
  WorkerWebsiteDescNullsLast = 'worker_website_DESC_NULLS_LAST',
}

export type DelegationReward = {
  __typename?: 'DelegationReward';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  delegation: Delegation;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type DelegationRewardEdge = {
  __typename?: 'DelegationRewardEdge';
  cursor: Scalars['String']['output'];
  node: DelegationReward;
};

export enum DelegationRewardOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DelegationClaimableRewardAsc = 'delegation_claimableReward_ASC',
  DelegationClaimableRewardAscNullsFirst = 'delegation_claimableReward_ASC_NULLS_FIRST',
  DelegationClaimableRewardAscNullsLast = 'delegation_claimableReward_ASC_NULLS_LAST',
  DelegationClaimableRewardDesc = 'delegation_claimableReward_DESC',
  DelegationClaimableRewardDescNullsFirst = 'delegation_claimableReward_DESC_NULLS_FIRST',
  DelegationClaimableRewardDescNullsLast = 'delegation_claimableReward_DESC_NULLS_LAST',
  DelegationClaimedRewardAsc = 'delegation_claimedReward_ASC',
  DelegationClaimedRewardAscNullsFirst = 'delegation_claimedReward_ASC_NULLS_FIRST',
  DelegationClaimedRewardAscNullsLast = 'delegation_claimedReward_ASC_NULLS_LAST',
  DelegationClaimedRewardDesc = 'delegation_claimedReward_DESC',
  DelegationClaimedRewardDescNullsFirst = 'delegation_claimedReward_DESC_NULLS_FIRST',
  DelegationClaimedRewardDescNullsLast = 'delegation_claimedReward_DESC_NULLS_LAST',
  DelegationDepositAsc = 'delegation_deposit_ASC',
  DelegationDepositAscNullsFirst = 'delegation_deposit_ASC_NULLS_FIRST',
  DelegationDepositAscNullsLast = 'delegation_deposit_ASC_NULLS_LAST',
  DelegationDepositDesc = 'delegation_deposit_DESC',
  DelegationDepositDescNullsFirst = 'delegation_deposit_DESC_NULLS_FIRST',
  DelegationDepositDescNullsLast = 'delegation_deposit_DESC_NULLS_LAST',
  DelegationIdAsc = 'delegation_id_ASC',
  DelegationIdAscNullsFirst = 'delegation_id_ASC_NULLS_FIRST',
  DelegationIdAscNullsLast = 'delegation_id_ASC_NULLS_LAST',
  DelegationIdDesc = 'delegation_id_DESC',
  DelegationIdDescNullsFirst = 'delegation_id_DESC_NULLS_FIRST',
  DelegationIdDescNullsLast = 'delegation_id_DESC_NULLS_LAST',
  DelegationLockEndAsc = 'delegation_lockEnd_ASC',
  DelegationLockEndAscNullsFirst = 'delegation_lockEnd_ASC_NULLS_FIRST',
  DelegationLockEndAscNullsLast = 'delegation_lockEnd_ASC_NULLS_LAST',
  DelegationLockEndDesc = 'delegation_lockEnd_DESC',
  DelegationLockEndDescNullsFirst = 'delegation_lockEnd_DESC_NULLS_FIRST',
  DelegationLockEndDescNullsLast = 'delegation_lockEnd_DESC_NULLS_LAST',
  DelegationLockStartAsc = 'delegation_lockStart_ASC',
  DelegationLockStartAscNullsFirst = 'delegation_lockStart_ASC_NULLS_FIRST',
  DelegationLockStartAscNullsLast = 'delegation_lockStart_ASC_NULLS_LAST',
  DelegationLockStartDesc = 'delegation_lockStart_DESC',
  DelegationLockStartDescNullsFirst = 'delegation_lockStart_DESC_NULLS_FIRST',
  DelegationLockStartDescNullsLast = 'delegation_lockStart_DESC_NULLS_LAST',
  DelegationLockedAsc = 'delegation_locked_ASC',
  DelegationLockedAscNullsFirst = 'delegation_locked_ASC_NULLS_FIRST',
  DelegationLockedAscNullsLast = 'delegation_locked_ASC_NULLS_LAST',
  DelegationLockedDesc = 'delegation_locked_DESC',
  DelegationLockedDescNullsFirst = 'delegation_locked_DESC_NULLS_FIRST',
  DelegationLockedDescNullsLast = 'delegation_locked_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type DelegationRewardWhereInput = {
  AND?: InputMaybe<Array<DelegationRewardWhereInput>>;
  OR?: InputMaybe<Array<DelegationRewardWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegation?: InputMaybe<DelegationWhereInput>;
  delegation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DelegationRewardsConnection = {
  __typename?: 'DelegationRewardsConnection';
  edges: Array<DelegationRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DelegationWhereInput = {
  AND?: InputMaybe<Array<DelegationWhereInput>>;
  OR?: InputMaybe<Array<DelegationWhereInput>>;
  claimableReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimableReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimableReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimedReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claims_every?: InputMaybe<ClaimWhereInput>;
  claims_none?: InputMaybe<ClaimWhereInput>;
  claims_some?: InputMaybe<ClaimWhereInput>;
  deposit_eq?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  deposit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  lockEnd_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockEnd_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockStart_lt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_lte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  locked_eq?: InputMaybe<Scalars['Boolean']['input']>;
  locked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  locked_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  realOwner?: InputMaybe<AccountWhereInput>;
  realOwner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewards_every?: InputMaybe<DelegationRewardWhereInput>;
  rewards_none?: InputMaybe<DelegationRewardWhereInput>;
  rewards_some?: InputMaybe<DelegationRewardWhereInput>;
  worker?: InputMaybe<WorkerWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DelegationsConnection = {
  __typename?: 'DelegationsConnection';
  edges: Array<DelegationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Epoch = {
  __typename?: 'Epoch';
  activeWorkerIds?: Maybe<Array<Scalars['String']['output']>>;
  end: Scalars['Int']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: EpochStatus;
};

export type EpochEdge = {
  __typename?: 'EpochEdge';
  cursor: Scalars['String']['output'];
  node: Epoch;
};

export enum EpochOrderByInput {
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndAscNullsLast = 'end_ASC_NULLS_LAST',
  EndDesc = 'end_DESC',
  EndDescNullsFirst = 'end_DESC_NULLS_FIRST',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  EndedAtAsc = 'endedAt_ASC',
  EndedAtAscNullsFirst = 'endedAt_ASC_NULLS_FIRST',
  EndedAtAscNullsLast = 'endedAt_ASC_NULLS_LAST',
  EndedAtDesc = 'endedAt_DESC',
  EndedAtDescNullsFirst = 'endedAt_DESC_NULLS_FIRST',
  EndedAtDescNullsLast = 'endedAt_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NumberAsc = 'number_ASC',
  NumberAscNullsFirst = 'number_ASC_NULLS_FIRST',
  NumberAscNullsLast = 'number_ASC_NULLS_LAST',
  NumberDesc = 'number_DESC',
  NumberDescNullsFirst = 'number_DESC_NULLS_FIRST',
  NumberDescNullsLast = 'number_DESC_NULLS_LAST',
  StartAsc = 'start_ASC',
  StartAscNullsFirst = 'start_ASC_NULLS_FIRST',
  StartAscNullsLast = 'start_ASC_NULLS_LAST',
  StartDesc = 'start_DESC',
  StartDescNullsFirst = 'start_DESC_NULLS_FIRST',
  StartDescNullsLast = 'start_DESC_NULLS_LAST',
  StartedAtAsc = 'startedAt_ASC',
  StartedAtAscNullsFirst = 'startedAt_ASC_NULLS_FIRST',
  StartedAtAscNullsLast = 'startedAt_ASC_NULLS_LAST',
  StartedAtDesc = 'startedAt_DESC',
  StartedAtDescNullsFirst = 'startedAt_DESC_NULLS_FIRST',
  StartedAtDescNullsLast = 'startedAt_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
}

export enum EpochStatus {
  Ended = 'ENDED',
  Planned = 'PLANNED',
  Started = 'STARTED',
}

export type EpochWhereInput = {
  AND?: InputMaybe<Array<EpochWhereInput>>;
  OR?: InputMaybe<Array<EpochWhereInput>>;
  activeWorkerIds_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  activeWorkerIds_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  activeWorkerIds_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  activeWorkerIds_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_eq?: InputMaybe<Scalars['Int']['input']>;
  end_gt?: InputMaybe<Scalars['Int']['input']>;
  end_gte?: InputMaybe<Scalars['Int']['input']>;
  end_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  end_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_lt?: InputMaybe<Scalars['Int']['input']>;
  end_lte?: InputMaybe<Scalars['Int']['input']>;
  end_not_eq?: InputMaybe<Scalars['Int']['input']>;
  end_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  endedAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  endedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  endedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  endedAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  number_eq?: InputMaybe<Scalars['Int']['input']>;
  number_gt?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
  number_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  number_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  number_lt?: InputMaybe<Scalars['Int']['input']>;
  number_lte?: InputMaybe<Scalars['Int']['input']>;
  number_not_eq?: InputMaybe<Scalars['Int']['input']>;
  number_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  start_eq?: InputMaybe<Scalars['Int']['input']>;
  start_gt?: InputMaybe<Scalars['Int']['input']>;
  start_gte?: InputMaybe<Scalars['Int']['input']>;
  start_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  start_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  start_lt?: InputMaybe<Scalars['Int']['input']>;
  start_lte?: InputMaybe<Scalars['Int']['input']>;
  start_not_eq?: InputMaybe<Scalars['Int']['input']>;
  start_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  startedAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  startedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  status_eq?: InputMaybe<EpochStatus>;
  status_in?: InputMaybe<Array<EpochStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EpochStatus>;
  status_not_in?: InputMaybe<Array<EpochStatus>>;
};

export type EpochesConnection = {
  __typename?: 'EpochesConnection';
  edges: Array<EpochEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Gateway = {
  __typename?: 'Gateway';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  endpointUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner: Account;
  realOwner: Account;
  stake: GatewayStake;
  status: GatewayStatus;
  statusHistory: Array<GatewayStatusChange>;
  website?: Maybe<Scalars['String']['output']>;
};

export type GatewayStatusHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayStatusChangeOrderByInput>>;
  where?: InputMaybe<GatewayStatusChangeWhereInput>;
};

export type GatewayEdge = {
  __typename?: 'GatewayEdge';
  cursor: Scalars['String']['output'];
  node: Gateway;
};

export enum GatewayOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtAscNullsLast = 'createdAt_ASC_NULLS_LAST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsFirst = 'createdAt_DESC_NULLS_FIRST',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EmailAsc = 'email_ASC',
  EmailAscNullsFirst = 'email_ASC_NULLS_FIRST',
  EmailAscNullsLast = 'email_ASC_NULLS_LAST',
  EmailDesc = 'email_DESC',
  EmailDescNullsFirst = 'email_DESC_NULLS_FIRST',
  EmailDescNullsLast = 'email_DESC_NULLS_LAST',
  EndpointUrlAsc = 'endpointUrl_ASC',
  EndpointUrlAscNullsFirst = 'endpointUrl_ASC_NULLS_FIRST',
  EndpointUrlAscNullsLast = 'endpointUrl_ASC_NULLS_LAST',
  EndpointUrlDesc = 'endpointUrl_DESC',
  EndpointUrlDescNullsFirst = 'endpointUrl_DESC_NULLS_FIRST',
  EndpointUrlDescNullsLast = 'endpointUrl_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceAscNullsLast = 'owner_balance_ASC_NULLS_LAST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsFirst = 'owner_balance_DESC_NULLS_FIRST',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountAscNullsLast = 'owner_claimableDelegationCount_ASC_NULLS_LAST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsFirst = 'owner_claimableDelegationCount_DESC_NULLS_FIRST',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdAscNullsLast = 'owner_id_ASC_NULLS_LAST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsFirst = 'owner_id_DESC_NULLS_FIRST',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeAscNullsLast = 'owner_type_ASC_NULLS_LAST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsFirst = 'owner_type_DESC_NULLS_FIRST',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceAscNullsLast = 'realOwner_balance_ASC_NULLS_LAST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsFirst = 'realOwner_balance_DESC_NULLS_FIRST',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountAscNullsLast = 'realOwner_claimableDelegationCount_ASC_NULLS_LAST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsFirst = 'realOwner_claimableDelegationCount_DESC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdAscNullsLast = 'realOwner_id_ASC_NULLS_LAST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsFirst = 'realOwner_id_DESC_NULLS_FIRST',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeAscNullsLast = 'realOwner_type_ASC_NULLS_LAST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsFirst = 'realOwner_type_DESC_NULLS_FIRST',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
  StakeAmountAsc = 'stake_amount_ASC',
  StakeAmountAscNullsFirst = 'stake_amount_ASC_NULLS_FIRST',
  StakeAmountAscNullsLast = 'stake_amount_ASC_NULLS_LAST',
  StakeAmountDesc = 'stake_amount_DESC',
  StakeAmountDescNullsFirst = 'stake_amount_DESC_NULLS_FIRST',
  StakeAmountDescNullsLast = 'stake_amount_DESC_NULLS_LAST',
  StakeAutoExtensionAsc = 'stake_autoExtension_ASC',
  StakeAutoExtensionAscNullsFirst = 'stake_autoExtension_ASC_NULLS_FIRST',
  StakeAutoExtensionAscNullsLast = 'stake_autoExtension_ASC_NULLS_LAST',
  StakeAutoExtensionDesc = 'stake_autoExtension_DESC',
  StakeAutoExtensionDescNullsFirst = 'stake_autoExtension_DESC_NULLS_FIRST',
  StakeAutoExtensionDescNullsLast = 'stake_autoExtension_DESC_NULLS_LAST',
  StakeComputationUnitsPendingAsc = 'stake_computationUnitsPending_ASC',
  StakeComputationUnitsPendingAscNullsFirst = 'stake_computationUnitsPending_ASC_NULLS_FIRST',
  StakeComputationUnitsPendingAscNullsLast = 'stake_computationUnitsPending_ASC_NULLS_LAST',
  StakeComputationUnitsPendingDesc = 'stake_computationUnitsPending_DESC',
  StakeComputationUnitsPendingDescNullsFirst = 'stake_computationUnitsPending_DESC_NULLS_FIRST',
  StakeComputationUnitsPendingDescNullsLast = 'stake_computationUnitsPending_DESC_NULLS_LAST',
  StakeComputationUnitsAsc = 'stake_computationUnits_ASC',
  StakeComputationUnitsAscNullsFirst = 'stake_computationUnits_ASC_NULLS_FIRST',
  StakeComputationUnitsAscNullsLast = 'stake_computationUnits_ASC_NULLS_LAST',
  StakeComputationUnitsDesc = 'stake_computationUnits_DESC',
  StakeComputationUnitsDescNullsFirst = 'stake_computationUnits_DESC_NULLS_FIRST',
  StakeComputationUnitsDescNullsLast = 'stake_computationUnits_DESC_NULLS_LAST',
  StakeIdAsc = 'stake_id_ASC',
  StakeIdAscNullsFirst = 'stake_id_ASC_NULLS_FIRST',
  StakeIdAscNullsLast = 'stake_id_ASC_NULLS_LAST',
  StakeIdDesc = 'stake_id_DESC',
  StakeIdDescNullsFirst = 'stake_id_DESC_NULLS_FIRST',
  StakeIdDescNullsLast = 'stake_id_DESC_NULLS_LAST',
  StakeLockEndAsc = 'stake_lockEnd_ASC',
  StakeLockEndAscNullsFirst = 'stake_lockEnd_ASC_NULLS_FIRST',
  StakeLockEndAscNullsLast = 'stake_lockEnd_ASC_NULLS_LAST',
  StakeLockEndDesc = 'stake_lockEnd_DESC',
  StakeLockEndDescNullsFirst = 'stake_lockEnd_DESC_NULLS_FIRST',
  StakeLockEndDescNullsLast = 'stake_lockEnd_DESC_NULLS_LAST',
  StakeLockStartAsc = 'stake_lockStart_ASC',
  StakeLockStartAscNullsFirst = 'stake_lockStart_ASC_NULLS_FIRST',
  StakeLockStartAscNullsLast = 'stake_lockStart_ASC_NULLS_LAST',
  StakeLockStartDesc = 'stake_lockStart_DESC',
  StakeLockStartDescNullsFirst = 'stake_lockStart_DESC_NULLS_FIRST',
  StakeLockStartDescNullsLast = 'stake_lockStart_DESC_NULLS_LAST',
  StakeLockedAsc = 'stake_locked_ASC',
  StakeLockedAscNullsFirst = 'stake_locked_ASC_NULLS_FIRST',
  StakeLockedAscNullsLast = 'stake_locked_ASC_NULLS_LAST',
  StakeLockedDesc = 'stake_locked_DESC',
  StakeLockedDescNullsFirst = 'stake_locked_DESC_NULLS_FIRST',
  StakeLockedDescNullsLast = 'stake_locked_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  WebsiteAsc = 'website_ASC',
  WebsiteAscNullsFirst = 'website_ASC_NULLS_FIRST',
  WebsiteAscNullsLast = 'website_ASC_NULLS_LAST',
  WebsiteDesc = 'website_DESC',
  WebsiteDescNullsFirst = 'website_DESC_NULLS_FIRST',
  WebsiteDescNullsLast = 'website_DESC_NULLS_LAST',
}

export type GatewayStake = {
  __typename?: 'GatewayStake';
  amount: Scalars['BigInt']['output'];
  autoExtension: Scalars['Boolean']['output'];
  computationUnits: Scalars['BigInt']['output'];
  computationUnitsPending?: Maybe<Scalars['BigInt']['output']>;
  gateways: Array<Gateway>;
  id: Scalars['String']['output'];
  lockEnd?: Maybe<Scalars['Int']['output']>;
  lockStart?: Maybe<Scalars['Int']['output']>;
  locked: Scalars['Boolean']['output'];
  owner: Account;
  realOwner: Account;
};

export type GatewayStakeGatewaysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayOrderByInput>>;
  where?: InputMaybe<GatewayWhereInput>;
};

export type GatewayStakeEdge = {
  __typename?: 'GatewayStakeEdge';
  cursor: Scalars['String']['output'];
  node: GatewayStake;
};

export enum GatewayStakeOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  AutoExtensionAsc = 'autoExtension_ASC',
  AutoExtensionAscNullsFirst = 'autoExtension_ASC_NULLS_FIRST',
  AutoExtensionAscNullsLast = 'autoExtension_ASC_NULLS_LAST',
  AutoExtensionDesc = 'autoExtension_DESC',
  AutoExtensionDescNullsFirst = 'autoExtension_DESC_NULLS_FIRST',
  AutoExtensionDescNullsLast = 'autoExtension_DESC_NULLS_LAST',
  ComputationUnitsPendingAsc = 'computationUnitsPending_ASC',
  ComputationUnitsPendingAscNullsFirst = 'computationUnitsPending_ASC_NULLS_FIRST',
  ComputationUnitsPendingAscNullsLast = 'computationUnitsPending_ASC_NULLS_LAST',
  ComputationUnitsPendingDesc = 'computationUnitsPending_DESC',
  ComputationUnitsPendingDescNullsFirst = 'computationUnitsPending_DESC_NULLS_FIRST',
  ComputationUnitsPendingDescNullsLast = 'computationUnitsPending_DESC_NULLS_LAST',
  ComputationUnitsAsc = 'computationUnits_ASC',
  ComputationUnitsAscNullsFirst = 'computationUnits_ASC_NULLS_FIRST',
  ComputationUnitsAscNullsLast = 'computationUnits_ASC_NULLS_LAST',
  ComputationUnitsDesc = 'computationUnits_DESC',
  ComputationUnitsDescNullsFirst = 'computationUnits_DESC_NULLS_FIRST',
  ComputationUnitsDescNullsLast = 'computationUnits_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndAscNullsLast = 'lockEnd_ASC_NULLS_LAST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsFirst = 'lockEnd_DESC_NULLS_FIRST',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartAscNullsLast = 'lockStart_ASC_NULLS_LAST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsFirst = 'lockStart_DESC_NULLS_FIRST',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedAscNullsLast = 'locked_ASC_NULLS_LAST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsFirst = 'locked_DESC_NULLS_FIRST',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceAscNullsLast = 'owner_balance_ASC_NULLS_LAST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsFirst = 'owner_balance_DESC_NULLS_FIRST',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountAscNullsLast = 'owner_claimableDelegationCount_ASC_NULLS_LAST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsFirst = 'owner_claimableDelegationCount_DESC_NULLS_FIRST',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdAscNullsLast = 'owner_id_ASC_NULLS_LAST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsFirst = 'owner_id_DESC_NULLS_FIRST',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeAscNullsLast = 'owner_type_ASC_NULLS_LAST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsFirst = 'owner_type_DESC_NULLS_FIRST',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceAscNullsLast = 'realOwner_balance_ASC_NULLS_LAST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsFirst = 'realOwner_balance_DESC_NULLS_FIRST',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountAscNullsLast = 'realOwner_claimableDelegationCount_ASC_NULLS_LAST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsFirst = 'realOwner_claimableDelegationCount_DESC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdAscNullsLast = 'realOwner_id_ASC_NULLS_LAST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsFirst = 'realOwner_id_DESC_NULLS_FIRST',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeAscNullsLast = 'realOwner_type_ASC_NULLS_LAST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsFirst = 'realOwner_type_DESC_NULLS_FIRST',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
}

export type GatewayStakeWhereInput = {
  AND?: InputMaybe<Array<GatewayStakeWhereInput>>;
  OR?: InputMaybe<Array<GatewayStakeWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  autoExtension_eq?: InputMaybe<Scalars['Boolean']['input']>;
  autoExtension_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  autoExtension_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  computationUnitsPending_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_gt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_gte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  computationUnitsPending_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  computationUnitsPending_lt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_lte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnitsPending_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  computationUnits_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  computationUnits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  computationUnits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gateways_every?: InputMaybe<GatewayWhereInput>;
  gateways_none?: InputMaybe<GatewayWhereInput>;
  gateways_some?: InputMaybe<GatewayWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  lockEnd_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockEnd_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockStart_lt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_lte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  locked_eq?: InputMaybe<Scalars['Boolean']['input']>;
  locked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  locked_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  realOwner?: InputMaybe<AccountWhereInput>;
  realOwner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GatewayStakesConnection = {
  __typename?: 'GatewayStakesConnection';
  edges: Array<GatewayStakeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum GatewayStatus {
  Deregistered = 'DEREGISTERED',
  Registered = 'REGISTERED',
  Unknown = 'UNKNOWN',
}

export type GatewayStatusChange = {
  __typename?: 'GatewayStatusChange';
  blockNumber: Scalars['Int']['output'];
  gateway: Gateway;
  id: Scalars['String']['output'];
  status: GatewayStatus;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type GatewayStatusChangeEdge = {
  __typename?: 'GatewayStatusChangeEdge';
  cursor: Scalars['String']['output'];
  node: GatewayStatusChange;
};

export enum GatewayStatusChangeOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  GatewayCreatedAtAsc = 'gateway_createdAt_ASC',
  GatewayCreatedAtAscNullsFirst = 'gateway_createdAt_ASC_NULLS_FIRST',
  GatewayCreatedAtAscNullsLast = 'gateway_createdAt_ASC_NULLS_LAST',
  GatewayCreatedAtDesc = 'gateway_createdAt_DESC',
  GatewayCreatedAtDescNullsFirst = 'gateway_createdAt_DESC_NULLS_FIRST',
  GatewayCreatedAtDescNullsLast = 'gateway_createdAt_DESC_NULLS_LAST',
  GatewayDescriptionAsc = 'gateway_description_ASC',
  GatewayDescriptionAscNullsFirst = 'gateway_description_ASC_NULLS_FIRST',
  GatewayDescriptionAscNullsLast = 'gateway_description_ASC_NULLS_LAST',
  GatewayDescriptionDesc = 'gateway_description_DESC',
  GatewayDescriptionDescNullsFirst = 'gateway_description_DESC_NULLS_FIRST',
  GatewayDescriptionDescNullsLast = 'gateway_description_DESC_NULLS_LAST',
  GatewayEmailAsc = 'gateway_email_ASC',
  GatewayEmailAscNullsFirst = 'gateway_email_ASC_NULLS_FIRST',
  GatewayEmailAscNullsLast = 'gateway_email_ASC_NULLS_LAST',
  GatewayEmailDesc = 'gateway_email_DESC',
  GatewayEmailDescNullsFirst = 'gateway_email_DESC_NULLS_FIRST',
  GatewayEmailDescNullsLast = 'gateway_email_DESC_NULLS_LAST',
  GatewayEndpointUrlAsc = 'gateway_endpointUrl_ASC',
  GatewayEndpointUrlAscNullsFirst = 'gateway_endpointUrl_ASC_NULLS_FIRST',
  GatewayEndpointUrlAscNullsLast = 'gateway_endpointUrl_ASC_NULLS_LAST',
  GatewayEndpointUrlDesc = 'gateway_endpointUrl_DESC',
  GatewayEndpointUrlDescNullsFirst = 'gateway_endpointUrl_DESC_NULLS_FIRST',
  GatewayEndpointUrlDescNullsLast = 'gateway_endpointUrl_DESC_NULLS_LAST',
  GatewayIdAsc = 'gateway_id_ASC',
  GatewayIdAscNullsFirst = 'gateway_id_ASC_NULLS_FIRST',
  GatewayIdAscNullsLast = 'gateway_id_ASC_NULLS_LAST',
  GatewayIdDesc = 'gateway_id_DESC',
  GatewayIdDescNullsFirst = 'gateway_id_DESC_NULLS_FIRST',
  GatewayIdDescNullsLast = 'gateway_id_DESC_NULLS_LAST',
  GatewayNameAsc = 'gateway_name_ASC',
  GatewayNameAscNullsFirst = 'gateway_name_ASC_NULLS_FIRST',
  GatewayNameAscNullsLast = 'gateway_name_ASC_NULLS_LAST',
  GatewayNameDesc = 'gateway_name_DESC',
  GatewayNameDescNullsFirst = 'gateway_name_DESC_NULLS_FIRST',
  GatewayNameDescNullsLast = 'gateway_name_DESC_NULLS_LAST',
  GatewayStatusAsc = 'gateway_status_ASC',
  GatewayStatusAscNullsFirst = 'gateway_status_ASC_NULLS_FIRST',
  GatewayStatusAscNullsLast = 'gateway_status_ASC_NULLS_LAST',
  GatewayStatusDesc = 'gateway_status_DESC',
  GatewayStatusDescNullsFirst = 'gateway_status_DESC_NULLS_FIRST',
  GatewayStatusDescNullsLast = 'gateway_status_DESC_NULLS_LAST',
  GatewayWebsiteAsc = 'gateway_website_ASC',
  GatewayWebsiteAscNullsFirst = 'gateway_website_ASC_NULLS_FIRST',
  GatewayWebsiteAscNullsLast = 'gateway_website_ASC_NULLS_LAST',
  GatewayWebsiteDesc = 'gateway_website_DESC',
  GatewayWebsiteDescNullsFirst = 'gateway_website_DESC_NULLS_FIRST',
  GatewayWebsiteDescNullsLast = 'gateway_website_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type GatewayStatusChangeWhereInput = {
  AND?: InputMaybe<Array<GatewayStatusChangeWhereInput>>;
  OR?: InputMaybe<Array<GatewayStatusChangeWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  gateway?: InputMaybe<GatewayWhereInput>;
  gateway_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<GatewayStatus>;
  status_in?: InputMaybe<Array<GatewayStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<GatewayStatus>;
  status_not_in?: InputMaybe<Array<GatewayStatus>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type GatewayStatusChangesConnection = {
  __typename?: 'GatewayStatusChangesConnection';
  edges: Array<GatewayStatusChangeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GatewayWhereInput = {
  AND?: InputMaybe<Array<GatewayWhereInput>>;
  OR?: InputMaybe<Array<GatewayWhereInput>>;
  createdAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  email_contains?: InputMaybe<Scalars['String']['input']>;
  email_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  email_endsWith?: InputMaybe<Scalars['String']['input']>;
  email_eq?: InputMaybe<Scalars['String']['input']>;
  email_gt?: InputMaybe<Scalars['String']['input']>;
  email_gte?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  email_lt?: InputMaybe<Scalars['String']['input']>;
  email_lte?: InputMaybe<Scalars['String']['input']>;
  email_not_contains?: InputMaybe<Scalars['String']['input']>;
  email_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  email_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  email_not_eq?: InputMaybe<Scalars['String']['input']>;
  email_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  email_startsWith?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_contains?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_eq?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_gt?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_gte?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endpointUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  endpointUrl_lt?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_lte?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endpointUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  endpointUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  realOwner?: InputMaybe<AccountWhereInput>;
  realOwner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stake?: InputMaybe<GatewayStakeWhereInput>;
  stake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  statusHistory_every?: InputMaybe<GatewayStatusChangeWhereInput>;
  statusHistory_none?: InputMaybe<GatewayStatusChangeWhereInput>;
  statusHistory_some?: InputMaybe<GatewayStatusChangeWhereInput>;
  status_eq?: InputMaybe<GatewayStatus>;
  status_in?: InputMaybe<Array<GatewayStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<GatewayStatus>;
  status_not_in?: InputMaybe<Array<GatewayStatus>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  website_endsWith?: InputMaybe<Scalars['String']['input']>;
  website_eq?: InputMaybe<Scalars['String']['input']>;
  website_gt?: InputMaybe<Scalars['String']['input']>;
  website_gte?: InputMaybe<Scalars['String']['input']>;
  website_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  website_lt?: InputMaybe<Scalars['String']['input']>;
  website_lte?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  website_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  website_not_eq?: InputMaybe<Scalars['String']['input']>;
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  website_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type GatewaysConnection = {
  __typename?: 'GatewaysConnection';
  edges: Array<GatewayEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NetworkStats = {
  __typename?: 'NetworkStats';
  aprs: Array<AprSnapshot>;
  blockTime: Scalars['Float']['output'];
  blockTimeL1: Scalars['Float']['output'];
  lastBlock: Scalars['Float']['output'];
  lastBlockL1: Scalars['Float']['output'];
  lastBlockTimestamp: Scalars['DateTime']['output'];
  lastBlockTimestampL1: Scalars['DateTime']['output'];
  onlineWorkersCount: Scalars['Float']['output'];
  queries24Hours: Scalars['BigInt']['output'];
  queries90Days: Scalars['BigInt']['output'];
  servedData24Hours: Scalars['BigInt']['output'];
  servedData90Days: Scalars['BigInt']['output'];
  stakerApr: Scalars['Float']['output'];
  storedData: Scalars['BigInt']['output'];
  totalBond: Scalars['BigInt']['output'];
  totalDelegation: Scalars['BigInt']['output'];
  workerApr: Scalars['Float']['output'];
  workersCount: Scalars['Float']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  accountTransferById?: Maybe<AccountTransfer>;
  accountTransfers: Array<AccountTransfer>;
  accountTransfersConnection: AccountTransfersConnection;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  blockById?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  claimById?: Maybe<Claim>;
  claims: Array<Claim>;
  claimsConnection: ClaimsConnection;
  commitmentById?: Maybe<Commitment>;
  commitments: Array<Commitment>;
  commitmentsConnection: CommitmentsConnection;
  delegationById?: Maybe<Delegation>;
  delegationRewardById?: Maybe<DelegationReward>;
  delegationRewards: Array<DelegationReward>;
  delegationRewardsConnection: DelegationRewardsConnection;
  delegations: Array<Delegation>;
  delegationsConnection: DelegationsConnection;
  epochById?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  epochesConnection: EpochesConnection;
  gatewayById?: Maybe<Gateway>;
  gatewayStakeById?: Maybe<GatewayStake>;
  gatewayStakes: Array<GatewayStake>;
  gatewayStakesConnection: GatewayStakesConnection;
  gatewayStatusChangeById?: Maybe<GatewayStatusChange>;
  gatewayStatusChanges: Array<GatewayStatusChange>;
  gatewayStatusChangesConnection: GatewayStatusChangesConnection;
  gateways: Array<Gateway>;
  gatewaysConnection: GatewaysConnection;
  networkStats: NetworkStats;
  settings: Array<Settings>;
  settingsById?: Maybe<Settings>;
  settingsConnection: SettingsConnection;
  squidStatus: SquidStatus;
  statistics: Array<Statistics>;
  statisticsById?: Maybe<Statistics>;
  statisticsConnection: StatisticsConnection;
  transferById?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
  workerById?: Maybe<Worker>;
  workerRewardById?: Maybe<WorkerReward>;
  workerRewards: Array<WorkerReward>;
  workerRewardsConnection: WorkerRewardsConnection;
  workerSnapshotById?: Maybe<WorkerSnapshot>;
  workerSnapshots: Array<WorkerSnapshot>;
  workerSnapshotsByDay: Array<WorkerSnapshotDay>;
  workerSnapshotsConnection: WorkerSnapshotsConnection;
  workerStatusChangeById?: Maybe<WorkerStatusChange>;
  workerStatusChanges: Array<WorkerStatusChange>;
  workerStatusChangesConnection: WorkerStatusChangesConnection;
  workers: Array<Worker>;
  workersConnection: WorkersConnection;
};

export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountTransferOrderByInput>>;
  where?: InputMaybe<AccountTransferWhereInput>;
};

export type QueryAccountTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountTransferOrderByInput>;
  where?: InputMaybe<AccountTransferWhereInput>;
};

export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryBlockByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryClaimByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimOrderByInput>>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryClaimsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ClaimOrderByInput>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryCommitmentByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommitmentOrderByInput>>;
  where?: InputMaybe<CommitmentWhereInput>;
};

export type QueryCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CommitmentOrderByInput>;
  where?: InputMaybe<CommitmentWhereInput>;
};

export type QueryDelegationByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryDelegationRewardByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryDelegationRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DelegationRewardOrderByInput>>;
  where?: InputMaybe<DelegationRewardWhereInput>;
};

export type QueryDelegationRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DelegationRewardOrderByInput>;
  where?: InputMaybe<DelegationRewardWhereInput>;
};

export type QueryDelegationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DelegationOrderByInput>>;
  where?: InputMaybe<DelegationWhereInput>;
};

export type QueryDelegationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DelegationOrderByInput>;
  where?: InputMaybe<DelegationWhereInput>;
};

export type QueryEpochByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryEpochesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EpochOrderByInput>>;
  where?: InputMaybe<EpochWhereInput>;
};

export type QueryEpochesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EpochOrderByInput>;
  where?: InputMaybe<EpochWhereInput>;
};

export type QueryGatewayByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGatewayStakeByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGatewayStakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayStakeOrderByInput>>;
  where?: InputMaybe<GatewayStakeWhereInput>;
};

export type QueryGatewayStakesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GatewayStakeOrderByInput>;
  where?: InputMaybe<GatewayStakeWhereInput>;
};

export type QueryGatewayStatusChangeByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGatewayStatusChangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayStatusChangeOrderByInput>>;
  where?: InputMaybe<GatewayStatusChangeWhereInput>;
};

export type QueryGatewayStatusChangesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GatewayStatusChangeOrderByInput>;
  where?: InputMaybe<GatewayStatusChangeWhereInput>;
};

export type QueryGatewaysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayOrderByInput>>;
  where?: InputMaybe<GatewayWhereInput>;
};

export type QueryGatewaysConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GatewayOrderByInput>;
  where?: InputMaybe<GatewayWhereInput>;
};

export type QuerySettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SettingsOrderByInput>>;
  where?: InputMaybe<SettingsWhereInput>;
};

export type QuerySettingsByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySettingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SettingsOrderByInput>;
  where?: InputMaybe<SettingsWhereInput>;
};

export type QueryStatisticsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatisticsOrderByInput>>;
  where?: InputMaybe<StatisticsWhereInput>;
};

export type QueryStatisticsByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryStatisticsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StatisticsOrderByInput>;
  where?: InputMaybe<StatisticsWhereInput>;
};

export type QueryTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type QueryTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
};

export type QueryWorkerByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWorkerRewardByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWorkerRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerRewardOrderByInput>>;
  where?: InputMaybe<WorkerRewardWhereInput>;
};

export type QueryWorkerRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WorkerRewardOrderByInput>;
  where?: InputMaybe<WorkerRewardWhereInput>;
};

export type QueryWorkerSnapshotByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWorkerSnapshotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerSnapshotOrderByInput>>;
  where?: InputMaybe<WorkerSnapshotWhereInput>;
};

export type QueryWorkerSnapshotsByDayArgs = {
  from: Scalars['DateTime']['input'];
  to?: InputMaybe<Scalars['DateTime']['input']>;
  workerId: Scalars['String']['input'];
};

export type QueryWorkerSnapshotsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WorkerSnapshotOrderByInput>;
  where?: InputMaybe<WorkerSnapshotWhereInput>;
};

export type QueryWorkerStatusChangeByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWorkerStatusChangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerStatusChangeOrderByInput>>;
  where?: InputMaybe<WorkerStatusChangeWhereInput>;
};

export type QueryWorkerStatusChangesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WorkerStatusChangeOrderByInput>;
  where?: InputMaybe<WorkerStatusChangeWhereInput>;
};

export type QueryWorkersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerOrderByInput>>;
  where?: InputMaybe<WorkerWhereInput>;
};

export type QueryWorkersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WorkerOrderByInput>;
  where?: InputMaybe<WorkerWhereInput>;
};

export type Settings = {
  __typename?: 'Settings';
  bondAmount?: Maybe<Scalars['BigInt']['output']>;
  delegationLimitCoefficient: Scalars['Float']['output'];
  epochLength?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  minimalWorkerVersion?: Maybe<Scalars['String']['output']>;
  recommendedWorkerVersion?: Maybe<Scalars['String']['output']>;
};

export type SettingsConnection = {
  __typename?: 'SettingsConnection';
  edges: Array<SettingsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SettingsEdge = {
  __typename?: 'SettingsEdge';
  cursor: Scalars['String']['output'];
  node: Settings;
};

export enum SettingsOrderByInput {
  BondAmountAsc = 'bondAmount_ASC',
  BondAmountAscNullsFirst = 'bondAmount_ASC_NULLS_FIRST',
  BondAmountAscNullsLast = 'bondAmount_ASC_NULLS_LAST',
  BondAmountDesc = 'bondAmount_DESC',
  BondAmountDescNullsFirst = 'bondAmount_DESC_NULLS_FIRST',
  BondAmountDescNullsLast = 'bondAmount_DESC_NULLS_LAST',
  DelegationLimitCoefficientAsc = 'delegationLimitCoefficient_ASC',
  DelegationLimitCoefficientAscNullsFirst = 'delegationLimitCoefficient_ASC_NULLS_FIRST',
  DelegationLimitCoefficientAscNullsLast = 'delegationLimitCoefficient_ASC_NULLS_LAST',
  DelegationLimitCoefficientDesc = 'delegationLimitCoefficient_DESC',
  DelegationLimitCoefficientDescNullsFirst = 'delegationLimitCoefficient_DESC_NULLS_FIRST',
  DelegationLimitCoefficientDescNullsLast = 'delegationLimitCoefficient_DESC_NULLS_LAST',
  EpochLengthAsc = 'epochLength_ASC',
  EpochLengthAscNullsFirst = 'epochLength_ASC_NULLS_FIRST',
  EpochLengthAscNullsLast = 'epochLength_ASC_NULLS_LAST',
  EpochLengthDesc = 'epochLength_DESC',
  EpochLengthDescNullsFirst = 'epochLength_DESC_NULLS_FIRST',
  EpochLengthDescNullsLast = 'epochLength_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MinimalWorkerVersionAsc = 'minimalWorkerVersion_ASC',
  MinimalWorkerVersionAscNullsFirst = 'minimalWorkerVersion_ASC_NULLS_FIRST',
  MinimalWorkerVersionAscNullsLast = 'minimalWorkerVersion_ASC_NULLS_LAST',
  MinimalWorkerVersionDesc = 'minimalWorkerVersion_DESC',
  MinimalWorkerVersionDescNullsFirst = 'minimalWorkerVersion_DESC_NULLS_FIRST',
  MinimalWorkerVersionDescNullsLast = 'minimalWorkerVersion_DESC_NULLS_LAST',
  RecommendedWorkerVersionAsc = 'recommendedWorkerVersion_ASC',
  RecommendedWorkerVersionAscNullsFirst = 'recommendedWorkerVersion_ASC_NULLS_FIRST',
  RecommendedWorkerVersionAscNullsLast = 'recommendedWorkerVersion_ASC_NULLS_LAST',
  RecommendedWorkerVersionDesc = 'recommendedWorkerVersion_DESC',
  RecommendedWorkerVersionDescNullsFirst = 'recommendedWorkerVersion_DESC_NULLS_FIRST',
  RecommendedWorkerVersionDescNullsLast = 'recommendedWorkerVersion_DESC_NULLS_LAST',
}

export type SettingsWhereInput = {
  AND?: InputMaybe<Array<SettingsWhereInput>>;
  OR?: InputMaybe<Array<SettingsWhereInput>>;
  bondAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bondAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bondAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bondAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegationLimitCoefficient_eq?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_gt?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_gte?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  delegationLimitCoefficient_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegationLimitCoefficient_lt?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_lte?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_not_eq?: InputMaybe<Scalars['Float']['input']>;
  delegationLimitCoefficient_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  epochLength_eq?: InputMaybe<Scalars['Int']['input']>;
  epochLength_gt?: InputMaybe<Scalars['Int']['input']>;
  epochLength_gte?: InputMaybe<Scalars['Int']['input']>;
  epochLength_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epochLength_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  epochLength_lt?: InputMaybe<Scalars['Int']['input']>;
  epochLength_lte?: InputMaybe<Scalars['Int']['input']>;
  epochLength_not_eq?: InputMaybe<Scalars['Int']['input']>;
  epochLength_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_contains?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_endsWith?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_eq?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_gt?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_gte?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_in?: InputMaybe<Array<Scalars['String']['input']>>;
  minimalWorkerVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  minimalWorkerVersion_lt?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_lte?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_not_contains?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_not_eq?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  minimalWorkerVersion_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  minimalWorkerVersion_startsWith?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_contains?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_endsWith?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_eq?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_gt?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_gte?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recommendedWorkerVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  recommendedWorkerVersion_lt?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_lte?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_not_contains?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_not_eq?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recommendedWorkerVersion_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  recommendedWorkerVersion_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  finalizedHeight: Scalars['Float']['output'];
  height: Scalars['Float']['output'];
};

export type Statistics = {
  __typename?: 'Statistics';
  baseApr: Scalars['Float']['output'];
  blockTime: Scalars['Int']['output'];
  blockTimeL1: Scalars['Int']['output'];
  currentEpoch?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  lastBlock: Scalars['Int']['output'];
  lastBlockL1: Scalars['Int']['output'];
  lastBlockTimestamp: Scalars['DateTime']['output'];
  lastBlockTimestampL1: Scalars['DateTime']['output'];
  lastSnapshotTimestamp: Scalars['DateTime']['output'];
  utilizedStake: Scalars['BigInt']['output'];
};

export type StatisticsConnection = {
  __typename?: 'StatisticsConnection';
  edges: Array<StatisticsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StatisticsEdge = {
  __typename?: 'StatisticsEdge';
  cursor: Scalars['String']['output'];
  node: Statistics;
};

export enum StatisticsOrderByInput {
  BaseAprAsc = 'baseApr_ASC',
  BaseAprAscNullsFirst = 'baseApr_ASC_NULLS_FIRST',
  BaseAprAscNullsLast = 'baseApr_ASC_NULLS_LAST',
  BaseAprDesc = 'baseApr_DESC',
  BaseAprDescNullsFirst = 'baseApr_DESC_NULLS_FIRST',
  BaseAprDescNullsLast = 'baseApr_DESC_NULLS_LAST',
  BlockTimeL1Asc = 'blockTimeL1_ASC',
  BlockTimeL1AscNullsFirst = 'blockTimeL1_ASC_NULLS_FIRST',
  BlockTimeL1AscNullsLast = 'blockTimeL1_ASC_NULLS_LAST',
  BlockTimeL1Desc = 'blockTimeL1_DESC',
  BlockTimeL1DescNullsFirst = 'blockTimeL1_DESC_NULLS_FIRST',
  BlockTimeL1DescNullsLast = 'blockTimeL1_DESC_NULLS_LAST',
  BlockTimeAsc = 'blockTime_ASC',
  BlockTimeAscNullsFirst = 'blockTime_ASC_NULLS_FIRST',
  BlockTimeAscNullsLast = 'blockTime_ASC_NULLS_LAST',
  BlockTimeDesc = 'blockTime_DESC',
  BlockTimeDescNullsFirst = 'blockTime_DESC_NULLS_FIRST',
  BlockTimeDescNullsLast = 'blockTime_DESC_NULLS_LAST',
  CurrentEpochAsc = 'currentEpoch_ASC',
  CurrentEpochAscNullsFirst = 'currentEpoch_ASC_NULLS_FIRST',
  CurrentEpochAscNullsLast = 'currentEpoch_ASC_NULLS_LAST',
  CurrentEpochDesc = 'currentEpoch_DESC',
  CurrentEpochDescNullsFirst = 'currentEpoch_DESC_NULLS_FIRST',
  CurrentEpochDescNullsLast = 'currentEpoch_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastBlockL1Asc = 'lastBlockL1_ASC',
  LastBlockL1AscNullsFirst = 'lastBlockL1_ASC_NULLS_FIRST',
  LastBlockL1AscNullsLast = 'lastBlockL1_ASC_NULLS_LAST',
  LastBlockL1Desc = 'lastBlockL1_DESC',
  LastBlockL1DescNullsFirst = 'lastBlockL1_DESC_NULLS_FIRST',
  LastBlockL1DescNullsLast = 'lastBlockL1_DESC_NULLS_LAST',
  LastBlockTimestampL1Asc = 'lastBlockTimestampL1_ASC',
  LastBlockTimestampL1AscNullsFirst = 'lastBlockTimestampL1_ASC_NULLS_FIRST',
  LastBlockTimestampL1AscNullsLast = 'lastBlockTimestampL1_ASC_NULLS_LAST',
  LastBlockTimestampL1Desc = 'lastBlockTimestampL1_DESC',
  LastBlockTimestampL1DescNullsFirst = 'lastBlockTimestampL1_DESC_NULLS_FIRST',
  LastBlockTimestampL1DescNullsLast = 'lastBlockTimestampL1_DESC_NULLS_LAST',
  LastBlockTimestampAsc = 'lastBlockTimestamp_ASC',
  LastBlockTimestampAscNullsFirst = 'lastBlockTimestamp_ASC_NULLS_FIRST',
  LastBlockTimestampAscNullsLast = 'lastBlockTimestamp_ASC_NULLS_LAST',
  LastBlockTimestampDesc = 'lastBlockTimestamp_DESC',
  LastBlockTimestampDescNullsFirst = 'lastBlockTimestamp_DESC_NULLS_FIRST',
  LastBlockTimestampDescNullsLast = 'lastBlockTimestamp_DESC_NULLS_LAST',
  LastBlockAsc = 'lastBlock_ASC',
  LastBlockAscNullsFirst = 'lastBlock_ASC_NULLS_FIRST',
  LastBlockAscNullsLast = 'lastBlock_ASC_NULLS_LAST',
  LastBlockDesc = 'lastBlock_DESC',
  LastBlockDescNullsFirst = 'lastBlock_DESC_NULLS_FIRST',
  LastBlockDescNullsLast = 'lastBlock_DESC_NULLS_LAST',
  LastSnapshotTimestampAsc = 'lastSnapshotTimestamp_ASC',
  LastSnapshotTimestampAscNullsFirst = 'lastSnapshotTimestamp_ASC_NULLS_FIRST',
  LastSnapshotTimestampAscNullsLast = 'lastSnapshotTimestamp_ASC_NULLS_LAST',
  LastSnapshotTimestampDesc = 'lastSnapshotTimestamp_DESC',
  LastSnapshotTimestampDescNullsFirst = 'lastSnapshotTimestamp_DESC_NULLS_FIRST',
  LastSnapshotTimestampDescNullsLast = 'lastSnapshotTimestamp_DESC_NULLS_LAST',
  UtilizedStakeAsc = 'utilizedStake_ASC',
  UtilizedStakeAscNullsFirst = 'utilizedStake_ASC_NULLS_FIRST',
  UtilizedStakeAscNullsLast = 'utilizedStake_ASC_NULLS_LAST',
  UtilizedStakeDesc = 'utilizedStake_DESC',
  UtilizedStakeDescNullsFirst = 'utilizedStake_DESC_NULLS_FIRST',
  UtilizedStakeDescNullsLast = 'utilizedStake_DESC_NULLS_LAST',
}

export type StatisticsWhereInput = {
  AND?: InputMaybe<Array<StatisticsWhereInput>>;
  OR?: InputMaybe<Array<StatisticsWhereInput>>;
  baseApr_eq?: InputMaybe<Scalars['Float']['input']>;
  baseApr_gt?: InputMaybe<Scalars['Float']['input']>;
  baseApr_gte?: InputMaybe<Scalars['Float']['input']>;
  baseApr_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  baseApr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  baseApr_lt?: InputMaybe<Scalars['Float']['input']>;
  baseApr_lte?: InputMaybe<Scalars['Float']['input']>;
  baseApr_not_eq?: InputMaybe<Scalars['Float']['input']>;
  baseApr_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  blockTimeL1_eq?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_gt?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_gte?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockTimeL1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimeL1_lt?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_lte?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockTimeL1_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockTime_eq?: InputMaybe<Scalars['Int']['input']>;
  blockTime_gt?: InputMaybe<Scalars['Int']['input']>;
  blockTime_gte?: InputMaybe<Scalars['Int']['input']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTime_lt?: InputMaybe<Scalars['Int']['input']>;
  blockTime_lte?: InputMaybe<Scalars['Int']['input']>;
  blockTime_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentEpoch_eq?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentEpoch_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_not_eq?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  lastBlockL1_eq?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_gt?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_gte?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastBlockL1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastBlockL1_lt?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_lte?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastBlockL1_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastBlockTimestampL1_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastBlockTimestampL1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastBlockTimestampL1_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestampL1_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastBlockTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastBlockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastBlockTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastBlockTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastSnapshotTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastSnapshotTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastSnapshotTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastSnapshotTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  utilizedStake_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utilizedStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  utilizedStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utilizedStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  from: Account;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Account;
};

export enum TransferDirection {
  From = 'FROM',
  To = 'TO',
}

export type TransferEdge = {
  __typename?: 'TransferEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

export enum TransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FromBalanceAsc = 'from_balance_ASC',
  FromBalanceAscNullsFirst = 'from_balance_ASC_NULLS_FIRST',
  FromBalanceAscNullsLast = 'from_balance_ASC_NULLS_LAST',
  FromBalanceDesc = 'from_balance_DESC',
  FromBalanceDescNullsFirst = 'from_balance_DESC_NULLS_FIRST',
  FromBalanceDescNullsLast = 'from_balance_DESC_NULLS_LAST',
  FromClaimableDelegationCountAsc = 'from_claimableDelegationCount_ASC',
  FromClaimableDelegationCountAscNullsFirst = 'from_claimableDelegationCount_ASC_NULLS_FIRST',
  FromClaimableDelegationCountAscNullsLast = 'from_claimableDelegationCount_ASC_NULLS_LAST',
  FromClaimableDelegationCountDesc = 'from_claimableDelegationCount_DESC',
  FromClaimableDelegationCountDescNullsFirst = 'from_claimableDelegationCount_DESC_NULLS_FIRST',
  FromClaimableDelegationCountDescNullsLast = 'from_claimableDelegationCount_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdAscNullsLast = 'from_id_ASC_NULLS_LAST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsFirst = 'from_id_DESC_NULLS_FIRST',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromTypeAsc = 'from_type_ASC',
  FromTypeAscNullsFirst = 'from_type_ASC_NULLS_FIRST',
  FromTypeAscNullsLast = 'from_type_ASC_NULLS_LAST',
  FromTypeDesc = 'from_type_DESC',
  FromTypeDescNullsFirst = 'from_type_DESC_NULLS_FIRST',
  FromTypeDescNullsLast = 'from_type_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToBalanceAsc = 'to_balance_ASC',
  ToBalanceAscNullsFirst = 'to_balance_ASC_NULLS_FIRST',
  ToBalanceAscNullsLast = 'to_balance_ASC_NULLS_LAST',
  ToBalanceDesc = 'to_balance_DESC',
  ToBalanceDescNullsFirst = 'to_balance_DESC_NULLS_FIRST',
  ToBalanceDescNullsLast = 'to_balance_DESC_NULLS_LAST',
  ToClaimableDelegationCountAsc = 'to_claimableDelegationCount_ASC',
  ToClaimableDelegationCountAscNullsFirst = 'to_claimableDelegationCount_ASC_NULLS_FIRST',
  ToClaimableDelegationCountAscNullsLast = 'to_claimableDelegationCount_ASC_NULLS_LAST',
  ToClaimableDelegationCountDesc = 'to_claimableDelegationCount_DESC',
  ToClaimableDelegationCountDescNullsFirst = 'to_claimableDelegationCount_DESC_NULLS_FIRST',
  ToClaimableDelegationCountDescNullsLast = 'to_claimableDelegationCount_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdAscNullsLast = 'to_id_ASC_NULLS_LAST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsFirst = 'to_id_DESC_NULLS_FIRST',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToTypeAsc = 'to_type_ASC',
  ToTypeAscNullsFirst = 'to_type_ASC_NULLS_FIRST',
  ToTypeAscNullsLast = 'to_type_ASC_NULLS_LAST',
  ToTypeDesc = 'to_type_DESC',
  ToTypeDescNullsFirst = 'to_type_DESC_NULLS_FIRST',
  ToTypeDescNullsLast = 'to_type_DESC_NULLS_LAST',
}

export type TransferWhereInput = {
  AND?: InputMaybe<Array<TransferWhereInput>>;
  OR?: InputMaybe<Array<TransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  from?: InputMaybe<AccountWhereInput>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to?: InputMaybe<AccountWhereInput>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Worker = {
  __typename?: 'Worker';
  apr?: Maybe<Scalars['Float']['output']>;
  bond: Scalars['BigInt']['output'];
  capedDelegation: Scalars['BigInt']['output'];
  claimableReward: Scalars['BigInt']['output'];
  claimedReward: Scalars['BigInt']['output'];
  claims: Array<Claim>;
  createdAt: Scalars['DateTime']['output'];
  dTenure?: Maybe<Scalars['Float']['output']>;
  dayUptimes?: Maybe<Array<WorkerDayUptime>>;
  delegationCount: Scalars['Int']['output'];
  delegations: Array<Delegation>;
  description?: Maybe<Scalars['String']['output']>;
  dialOk?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jailReason?: Maybe<Scalars['String']['output']>;
  jailed?: Maybe<Scalars['Boolean']['output']>;
  liveness?: Maybe<Scalars['Float']['output']>;
  lockEnd?: Maybe<Scalars['Int']['output']>;
  lockStart?: Maybe<Scalars['Int']['output']>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  online?: Maybe<Scalars['Boolean']['output']>;
  owner: Account;
  peerId: Scalars['String']['output'];
  queries24Hours?: Maybe<Scalars['BigInt']['output']>;
  queries90Days?: Maybe<Scalars['BigInt']['output']>;
  /** owner.owner for VESTING account */
  realOwner: Account;
  rewards: Array<WorkerReward>;
  scannedData24Hours?: Maybe<Scalars['BigInt']['output']>;
  scannedData90Days?: Maybe<Scalars['BigInt']['output']>;
  servedData24Hours?: Maybe<Scalars['BigInt']['output']>;
  servedData90Days?: Maybe<Scalars['BigInt']['output']>;
  snapshots: Array<WorkerSnapshot>;
  stakerApr?: Maybe<Scalars['Float']['output']>;
  status: WorkerStatus;
  statusHistory: Array<WorkerStatusChange>;
  storedData?: Maybe<Scalars['BigInt']['output']>;
  totalDelegation: Scalars['BigInt']['output'];
  totalDelegationRewards: Scalars['BigInt']['output'];
  trafficWeight?: Maybe<Scalars['Float']['output']>;
  uptime24Hours?: Maybe<Scalars['Float']['output']>;
  uptime90Days?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type WorkerClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimOrderByInput>>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type WorkerDelegationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DelegationOrderByInput>>;
  where?: InputMaybe<DelegationWhereInput>;
};

export type WorkerRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerRewardOrderByInput>>;
  where?: InputMaybe<WorkerRewardWhereInput>;
};

export type WorkerSnapshotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerSnapshotOrderByInput>>;
  where?: InputMaybe<WorkerSnapshotWhereInput>;
};

export type WorkerStatusHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkerStatusChangeOrderByInput>>;
  where?: InputMaybe<WorkerStatusChangeWhereInput>;
};

export type WorkerDayUptime = {
  __typename?: 'WorkerDayUptime';
  timestamp: Scalars['DateTime']['output'];
  uptime: Scalars['Float']['output'];
};

export type WorkerEdge = {
  __typename?: 'WorkerEdge';
  cursor: Scalars['String']['output'];
  node: Worker;
};

export enum WorkerOrderByInput {
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  BondAsc = 'bond_ASC',
  BondAscNullsFirst = 'bond_ASC_NULLS_FIRST',
  BondAscNullsLast = 'bond_ASC_NULLS_LAST',
  BondDesc = 'bond_DESC',
  BondDescNullsFirst = 'bond_DESC_NULLS_FIRST',
  BondDescNullsLast = 'bond_DESC_NULLS_LAST',
  CapedDelegationAsc = 'capedDelegation_ASC',
  CapedDelegationAscNullsFirst = 'capedDelegation_ASC_NULLS_FIRST',
  CapedDelegationAscNullsLast = 'capedDelegation_ASC_NULLS_LAST',
  CapedDelegationDesc = 'capedDelegation_DESC',
  CapedDelegationDescNullsFirst = 'capedDelegation_DESC_NULLS_FIRST',
  CapedDelegationDescNullsLast = 'capedDelegation_DESC_NULLS_LAST',
  ClaimableRewardAsc = 'claimableReward_ASC',
  ClaimableRewardAscNullsFirst = 'claimableReward_ASC_NULLS_FIRST',
  ClaimableRewardAscNullsLast = 'claimableReward_ASC_NULLS_LAST',
  ClaimableRewardDesc = 'claimableReward_DESC',
  ClaimableRewardDescNullsFirst = 'claimableReward_DESC_NULLS_FIRST',
  ClaimableRewardDescNullsLast = 'claimableReward_DESC_NULLS_LAST',
  ClaimedRewardAsc = 'claimedReward_ASC',
  ClaimedRewardAscNullsFirst = 'claimedReward_ASC_NULLS_FIRST',
  ClaimedRewardAscNullsLast = 'claimedReward_ASC_NULLS_LAST',
  ClaimedRewardDesc = 'claimedReward_DESC',
  ClaimedRewardDescNullsFirst = 'claimedReward_DESC_NULLS_FIRST',
  ClaimedRewardDescNullsLast = 'claimedReward_DESC_NULLS_LAST',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtAscNullsLast = 'createdAt_ASC_NULLS_LAST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsFirst = 'createdAt_DESC_NULLS_FIRST',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  DTenureAsc = 'dTenure_ASC',
  DTenureAscNullsFirst = 'dTenure_ASC_NULLS_FIRST',
  DTenureAscNullsLast = 'dTenure_ASC_NULLS_LAST',
  DTenureDesc = 'dTenure_DESC',
  DTenureDescNullsFirst = 'dTenure_DESC_NULLS_FIRST',
  DTenureDescNullsLast = 'dTenure_DESC_NULLS_LAST',
  DelegationCountAsc = 'delegationCount_ASC',
  DelegationCountAscNullsFirst = 'delegationCount_ASC_NULLS_FIRST',
  DelegationCountAscNullsLast = 'delegationCount_ASC_NULLS_LAST',
  DelegationCountDesc = 'delegationCount_DESC',
  DelegationCountDescNullsFirst = 'delegationCount_DESC_NULLS_FIRST',
  DelegationCountDescNullsLast = 'delegationCount_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  DialOkAsc = 'dialOk_ASC',
  DialOkAscNullsFirst = 'dialOk_ASC_NULLS_FIRST',
  DialOkAscNullsLast = 'dialOk_ASC_NULLS_LAST',
  DialOkDesc = 'dialOk_DESC',
  DialOkDescNullsFirst = 'dialOk_DESC_NULLS_FIRST',
  DialOkDescNullsLast = 'dialOk_DESC_NULLS_LAST',
  EmailAsc = 'email_ASC',
  EmailAscNullsFirst = 'email_ASC_NULLS_FIRST',
  EmailAscNullsLast = 'email_ASC_NULLS_LAST',
  EmailDesc = 'email_DESC',
  EmailDescNullsFirst = 'email_DESC_NULLS_FIRST',
  EmailDescNullsLast = 'email_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  JailReasonAsc = 'jailReason_ASC',
  JailReasonAscNullsFirst = 'jailReason_ASC_NULLS_FIRST',
  JailReasonAscNullsLast = 'jailReason_ASC_NULLS_LAST',
  JailReasonDesc = 'jailReason_DESC',
  JailReasonDescNullsFirst = 'jailReason_DESC_NULLS_FIRST',
  JailReasonDescNullsLast = 'jailReason_DESC_NULLS_LAST',
  JailedAsc = 'jailed_ASC',
  JailedAscNullsFirst = 'jailed_ASC_NULLS_FIRST',
  JailedAscNullsLast = 'jailed_ASC_NULLS_LAST',
  JailedDesc = 'jailed_DESC',
  JailedDescNullsFirst = 'jailed_DESC_NULLS_FIRST',
  JailedDescNullsLast = 'jailed_DESC_NULLS_LAST',
  LivenessAsc = 'liveness_ASC',
  LivenessAscNullsFirst = 'liveness_ASC_NULLS_FIRST',
  LivenessAscNullsLast = 'liveness_ASC_NULLS_LAST',
  LivenessDesc = 'liveness_DESC',
  LivenessDescNullsFirst = 'liveness_DESC_NULLS_FIRST',
  LivenessDescNullsLast = 'liveness_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndAscNullsLast = 'lockEnd_ASC_NULLS_LAST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsFirst = 'lockEnd_DESC_NULLS_FIRST',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartAscNullsLast = 'lockStart_ASC_NULLS_LAST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsFirst = 'lockStart_DESC_NULLS_FIRST',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedAscNullsLast = 'locked_ASC_NULLS_LAST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsFirst = 'locked_DESC_NULLS_FIRST',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  OnlineAsc = 'online_ASC',
  OnlineAscNullsFirst = 'online_ASC_NULLS_FIRST',
  OnlineAscNullsLast = 'online_ASC_NULLS_LAST',
  OnlineDesc = 'online_DESC',
  OnlineDescNullsFirst = 'online_DESC_NULLS_FIRST',
  OnlineDescNullsLast = 'online_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceAscNullsLast = 'owner_balance_ASC_NULLS_LAST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsFirst = 'owner_balance_DESC_NULLS_FIRST',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountAscNullsLast = 'owner_claimableDelegationCount_ASC_NULLS_LAST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsFirst = 'owner_claimableDelegationCount_DESC_NULLS_FIRST',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdAscNullsLast = 'owner_id_ASC_NULLS_LAST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsFirst = 'owner_id_DESC_NULLS_FIRST',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeAscNullsLast = 'owner_type_ASC_NULLS_LAST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsFirst = 'owner_type_DESC_NULLS_FIRST',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  PeerIdAsc = 'peerId_ASC',
  PeerIdAscNullsFirst = 'peerId_ASC_NULLS_FIRST',
  PeerIdAscNullsLast = 'peerId_ASC_NULLS_LAST',
  PeerIdDesc = 'peerId_DESC',
  PeerIdDescNullsFirst = 'peerId_DESC_NULLS_FIRST',
  PeerIdDescNullsLast = 'peerId_DESC_NULLS_LAST',
  Queries24HoursAsc = 'queries24Hours_ASC',
  Queries24HoursAscNullsFirst = 'queries24Hours_ASC_NULLS_FIRST',
  Queries24HoursAscNullsLast = 'queries24Hours_ASC_NULLS_LAST',
  Queries24HoursDesc = 'queries24Hours_DESC',
  Queries24HoursDescNullsFirst = 'queries24Hours_DESC_NULLS_FIRST',
  Queries24HoursDescNullsLast = 'queries24Hours_DESC_NULLS_LAST',
  Queries90DaysAsc = 'queries90Days_ASC',
  Queries90DaysAscNullsFirst = 'queries90Days_ASC_NULLS_FIRST',
  Queries90DaysAscNullsLast = 'queries90Days_ASC_NULLS_LAST',
  Queries90DaysDesc = 'queries90Days_DESC',
  Queries90DaysDescNullsFirst = 'queries90Days_DESC_NULLS_FIRST',
  Queries90DaysDescNullsLast = 'queries90Days_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceAscNullsLast = 'realOwner_balance_ASC_NULLS_LAST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsFirst = 'realOwner_balance_DESC_NULLS_FIRST',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountAscNullsLast = 'realOwner_claimableDelegationCount_ASC_NULLS_LAST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsFirst = 'realOwner_claimableDelegationCount_DESC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdAscNullsLast = 'realOwner_id_ASC_NULLS_LAST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsFirst = 'realOwner_id_DESC_NULLS_FIRST',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeAscNullsLast = 'realOwner_type_ASC_NULLS_LAST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsFirst = 'realOwner_type_DESC_NULLS_FIRST',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
  ScannedData24HoursAsc = 'scannedData24Hours_ASC',
  ScannedData24HoursAscNullsFirst = 'scannedData24Hours_ASC_NULLS_FIRST',
  ScannedData24HoursAscNullsLast = 'scannedData24Hours_ASC_NULLS_LAST',
  ScannedData24HoursDesc = 'scannedData24Hours_DESC',
  ScannedData24HoursDescNullsFirst = 'scannedData24Hours_DESC_NULLS_FIRST',
  ScannedData24HoursDescNullsLast = 'scannedData24Hours_DESC_NULLS_LAST',
  ScannedData90DaysAsc = 'scannedData90Days_ASC',
  ScannedData90DaysAscNullsFirst = 'scannedData90Days_ASC_NULLS_FIRST',
  ScannedData90DaysAscNullsLast = 'scannedData90Days_ASC_NULLS_LAST',
  ScannedData90DaysDesc = 'scannedData90Days_DESC',
  ScannedData90DaysDescNullsFirst = 'scannedData90Days_DESC_NULLS_FIRST',
  ScannedData90DaysDescNullsLast = 'scannedData90Days_DESC_NULLS_LAST',
  ServedData24HoursAsc = 'servedData24Hours_ASC',
  ServedData24HoursAscNullsFirst = 'servedData24Hours_ASC_NULLS_FIRST',
  ServedData24HoursAscNullsLast = 'servedData24Hours_ASC_NULLS_LAST',
  ServedData24HoursDesc = 'servedData24Hours_DESC',
  ServedData24HoursDescNullsFirst = 'servedData24Hours_DESC_NULLS_FIRST',
  ServedData24HoursDescNullsLast = 'servedData24Hours_DESC_NULLS_LAST',
  ServedData90DaysAsc = 'servedData90Days_ASC',
  ServedData90DaysAscNullsFirst = 'servedData90Days_ASC_NULLS_FIRST',
  ServedData90DaysAscNullsLast = 'servedData90Days_ASC_NULLS_LAST',
  ServedData90DaysDesc = 'servedData90Days_DESC',
  ServedData90DaysDescNullsFirst = 'servedData90Days_DESC_NULLS_FIRST',
  ServedData90DaysDescNullsLast = 'servedData90Days_DESC_NULLS_LAST',
  StakerAprAsc = 'stakerApr_ASC',
  StakerAprAscNullsFirst = 'stakerApr_ASC_NULLS_FIRST',
  StakerAprAscNullsLast = 'stakerApr_ASC_NULLS_LAST',
  StakerAprDesc = 'stakerApr_DESC',
  StakerAprDescNullsFirst = 'stakerApr_DESC_NULLS_FIRST',
  StakerAprDescNullsLast = 'stakerApr_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  StoredDataAsc = 'storedData_ASC',
  StoredDataAscNullsFirst = 'storedData_ASC_NULLS_FIRST',
  StoredDataAscNullsLast = 'storedData_ASC_NULLS_LAST',
  StoredDataDesc = 'storedData_DESC',
  StoredDataDescNullsFirst = 'storedData_DESC_NULLS_FIRST',
  StoredDataDescNullsLast = 'storedData_DESC_NULLS_LAST',
  TotalDelegationRewardsAsc = 'totalDelegationRewards_ASC',
  TotalDelegationRewardsAscNullsFirst = 'totalDelegationRewards_ASC_NULLS_FIRST',
  TotalDelegationRewardsAscNullsLast = 'totalDelegationRewards_ASC_NULLS_LAST',
  TotalDelegationRewardsDesc = 'totalDelegationRewards_DESC',
  TotalDelegationRewardsDescNullsFirst = 'totalDelegationRewards_DESC_NULLS_FIRST',
  TotalDelegationRewardsDescNullsLast = 'totalDelegationRewards_DESC_NULLS_LAST',
  TotalDelegationAsc = 'totalDelegation_ASC',
  TotalDelegationAscNullsFirst = 'totalDelegation_ASC_NULLS_FIRST',
  TotalDelegationAscNullsLast = 'totalDelegation_ASC_NULLS_LAST',
  TotalDelegationDesc = 'totalDelegation_DESC',
  TotalDelegationDescNullsFirst = 'totalDelegation_DESC_NULLS_FIRST',
  TotalDelegationDescNullsLast = 'totalDelegation_DESC_NULLS_LAST',
  TrafficWeightAsc = 'trafficWeight_ASC',
  TrafficWeightAscNullsFirst = 'trafficWeight_ASC_NULLS_FIRST',
  TrafficWeightAscNullsLast = 'trafficWeight_ASC_NULLS_LAST',
  TrafficWeightDesc = 'trafficWeight_DESC',
  TrafficWeightDescNullsFirst = 'trafficWeight_DESC_NULLS_FIRST',
  TrafficWeightDescNullsLast = 'trafficWeight_DESC_NULLS_LAST',
  Uptime24HoursAsc = 'uptime24Hours_ASC',
  Uptime24HoursAscNullsFirst = 'uptime24Hours_ASC_NULLS_FIRST',
  Uptime24HoursAscNullsLast = 'uptime24Hours_ASC_NULLS_LAST',
  Uptime24HoursDesc = 'uptime24Hours_DESC',
  Uptime24HoursDescNullsFirst = 'uptime24Hours_DESC_NULLS_FIRST',
  Uptime24HoursDescNullsLast = 'uptime24Hours_DESC_NULLS_LAST',
  Uptime90DaysAsc = 'uptime90Days_ASC',
  Uptime90DaysAscNullsFirst = 'uptime90Days_ASC_NULLS_FIRST',
  Uptime90DaysAscNullsLast = 'uptime90Days_ASC_NULLS_LAST',
  Uptime90DaysDesc = 'uptime90Days_DESC',
  Uptime90DaysDescNullsFirst = 'uptime90Days_DESC_NULLS_FIRST',
  Uptime90DaysDescNullsLast = 'uptime90Days_DESC_NULLS_LAST',
  VersionAsc = 'version_ASC',
  VersionAscNullsFirst = 'version_ASC_NULLS_FIRST',
  VersionAscNullsLast = 'version_ASC_NULLS_LAST',
  VersionDesc = 'version_DESC',
  VersionDescNullsFirst = 'version_DESC_NULLS_FIRST',
  VersionDescNullsLast = 'version_DESC_NULLS_LAST',
  WebsiteAsc = 'website_ASC',
  WebsiteAscNullsFirst = 'website_ASC_NULLS_FIRST',
  WebsiteAscNullsLast = 'website_ASC_NULLS_LAST',
  WebsiteDesc = 'website_DESC',
  WebsiteDescNullsFirst = 'website_DESC_NULLS_FIRST',
  WebsiteDescNullsLast = 'website_DESC_NULLS_LAST',
}

export type WorkerReward = {
  __typename?: 'WorkerReward';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  stakersReward: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  worker: Worker;
};

export type WorkerRewardEdge = {
  __typename?: 'WorkerRewardEdge';
  cursor: Scalars['String']['output'];
  node: WorkerReward;
};

export enum WorkerRewardOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakersRewardAsc = 'stakersReward_ASC',
  StakersRewardAscNullsFirst = 'stakersReward_ASC_NULLS_FIRST',
  StakersRewardAscNullsLast = 'stakersReward_ASC_NULLS_LAST',
  StakersRewardDesc = 'stakersReward_DESC',
  StakersRewardDescNullsFirst = 'stakersReward_DESC_NULLS_FIRST',
  StakersRewardDescNullsLast = 'stakersReward_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprAscNullsLast = 'worker_apr_ASC_NULLS_LAST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsFirst = 'worker_apr_DESC_NULLS_FIRST',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondAscNullsLast = 'worker_bond_ASC_NULLS_LAST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsFirst = 'worker_bond_DESC_NULLS_FIRST',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerCapedDelegationAsc = 'worker_capedDelegation_ASC',
  WorkerCapedDelegationAscNullsFirst = 'worker_capedDelegation_ASC_NULLS_FIRST',
  WorkerCapedDelegationAscNullsLast = 'worker_capedDelegation_ASC_NULLS_LAST',
  WorkerCapedDelegationDesc = 'worker_capedDelegation_DESC',
  WorkerCapedDelegationDescNullsFirst = 'worker_capedDelegation_DESC_NULLS_FIRST',
  WorkerCapedDelegationDescNullsLast = 'worker_capedDelegation_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardAscNullsLast = 'worker_claimableReward_ASC_NULLS_LAST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsFirst = 'worker_claimableReward_DESC_NULLS_FIRST',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardAscNullsLast = 'worker_claimedReward_ASC_NULLS_LAST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsFirst = 'worker_claimedReward_DESC_NULLS_FIRST',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtAscNullsLast = 'worker_createdAt_ASC_NULLS_LAST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsFirst = 'worker_createdAt_DESC_NULLS_FIRST',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDTenureAsc = 'worker_dTenure_ASC',
  WorkerDTenureAscNullsFirst = 'worker_dTenure_ASC_NULLS_FIRST',
  WorkerDTenureAscNullsLast = 'worker_dTenure_ASC_NULLS_LAST',
  WorkerDTenureDesc = 'worker_dTenure_DESC',
  WorkerDTenureDescNullsFirst = 'worker_dTenure_DESC_NULLS_FIRST',
  WorkerDTenureDescNullsLast = 'worker_dTenure_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountAscNullsLast = 'worker_delegationCount_ASC_NULLS_LAST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsFirst = 'worker_delegationCount_DESC_NULLS_FIRST',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionAscNullsLast = 'worker_description_ASC_NULLS_LAST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsFirst = 'worker_description_DESC_NULLS_FIRST',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkAscNullsLast = 'worker_dialOk_ASC_NULLS_LAST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsFirst = 'worker_dialOk_DESC_NULLS_FIRST',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailAscNullsLast = 'worker_email_ASC_NULLS_LAST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsFirst = 'worker_email_DESC_NULLS_FIRST',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailReasonAsc = 'worker_jailReason_ASC',
  WorkerJailReasonAscNullsFirst = 'worker_jailReason_ASC_NULLS_FIRST',
  WorkerJailReasonAscNullsLast = 'worker_jailReason_ASC_NULLS_LAST',
  WorkerJailReasonDesc = 'worker_jailReason_DESC',
  WorkerJailReasonDescNullsFirst = 'worker_jailReason_DESC_NULLS_FIRST',
  WorkerJailReasonDescNullsLast = 'worker_jailReason_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedAscNullsLast = 'worker_jailed_ASC_NULLS_LAST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsFirst = 'worker_jailed_DESC_NULLS_FIRST',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLivenessAsc = 'worker_liveness_ASC',
  WorkerLivenessAscNullsFirst = 'worker_liveness_ASC_NULLS_FIRST',
  WorkerLivenessAscNullsLast = 'worker_liveness_ASC_NULLS_LAST',
  WorkerLivenessDesc = 'worker_liveness_DESC',
  WorkerLivenessDescNullsFirst = 'worker_liveness_DESC_NULLS_FIRST',
  WorkerLivenessDescNullsLast = 'worker_liveness_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndAscNullsLast = 'worker_lockEnd_ASC_NULLS_LAST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsFirst = 'worker_lockEnd_DESC_NULLS_FIRST',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartAscNullsLast = 'worker_lockStart_ASC_NULLS_LAST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsFirst = 'worker_lockStart_DESC_NULLS_FIRST',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedAscNullsLast = 'worker_locked_ASC_NULLS_LAST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsFirst = 'worker_locked_DESC_NULLS_FIRST',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameAscNullsLast = 'worker_name_ASC_NULLS_LAST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsFirst = 'worker_name_DESC_NULLS_FIRST',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineAscNullsLast = 'worker_online_ASC_NULLS_LAST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsFirst = 'worker_online_DESC_NULLS_FIRST',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdAscNullsLast = 'worker_peerId_ASC_NULLS_LAST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsFirst = 'worker_peerId_DESC_NULLS_FIRST',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursAscNullsLast = 'worker_queries24Hours_ASC_NULLS_LAST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsFirst = 'worker_queries24Hours_DESC_NULLS_FIRST',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysAscNullsLast = 'worker_queries90Days_ASC_NULLS_LAST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsFirst = 'worker_queries90Days_DESC_NULLS_FIRST',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursAscNullsLast = 'worker_scannedData24Hours_ASC_NULLS_LAST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsFirst = 'worker_scannedData24Hours_DESC_NULLS_FIRST',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysAscNullsLast = 'worker_scannedData90Days_ASC_NULLS_LAST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsFirst = 'worker_scannedData90Days_DESC_NULLS_FIRST',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursAscNullsLast = 'worker_servedData24Hours_ASC_NULLS_LAST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsFirst = 'worker_servedData24Hours_DESC_NULLS_FIRST',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysAscNullsLast = 'worker_servedData90Days_ASC_NULLS_LAST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsFirst = 'worker_servedData90Days_DESC_NULLS_FIRST',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprAscNullsLast = 'worker_stakerApr_ASC_NULLS_LAST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsFirst = 'worker_stakerApr_DESC_NULLS_FIRST',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusAscNullsLast = 'worker_status_ASC_NULLS_LAST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsFirst = 'worker_status_DESC_NULLS_FIRST',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataAscNullsLast = 'worker_storedData_ASC_NULLS_LAST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsFirst = 'worker_storedData_DESC_NULLS_FIRST',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationRewardsAsc = 'worker_totalDelegationRewards_ASC',
  WorkerTotalDelegationRewardsAscNullsFirst = 'worker_totalDelegationRewards_ASC_NULLS_FIRST',
  WorkerTotalDelegationRewardsAscNullsLast = 'worker_totalDelegationRewards_ASC_NULLS_LAST',
  WorkerTotalDelegationRewardsDesc = 'worker_totalDelegationRewards_DESC',
  WorkerTotalDelegationRewardsDescNullsFirst = 'worker_totalDelegationRewards_DESC_NULLS_FIRST',
  WorkerTotalDelegationRewardsDescNullsLast = 'worker_totalDelegationRewards_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationAscNullsLast = 'worker_totalDelegation_ASC_NULLS_LAST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsFirst = 'worker_totalDelegation_DESC_NULLS_FIRST',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerTrafficWeightAsc = 'worker_trafficWeight_ASC',
  WorkerTrafficWeightAscNullsFirst = 'worker_trafficWeight_ASC_NULLS_FIRST',
  WorkerTrafficWeightAscNullsLast = 'worker_trafficWeight_ASC_NULLS_LAST',
  WorkerTrafficWeightDesc = 'worker_trafficWeight_DESC',
  WorkerTrafficWeightDescNullsFirst = 'worker_trafficWeight_DESC_NULLS_FIRST',
  WorkerTrafficWeightDescNullsLast = 'worker_trafficWeight_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursAscNullsLast = 'worker_uptime24Hours_ASC_NULLS_LAST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsFirst = 'worker_uptime24Hours_DESC_NULLS_FIRST',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysAscNullsLast = 'worker_uptime90Days_ASC_NULLS_LAST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsFirst = 'worker_uptime90Days_DESC_NULLS_FIRST',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionAscNullsLast = 'worker_version_ASC_NULLS_LAST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsFirst = 'worker_version_DESC_NULLS_FIRST',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteAscNullsLast = 'worker_website_ASC_NULLS_LAST',
  WorkerWebsiteDesc = 'worker_website_DESC',
  WorkerWebsiteDescNullsFirst = 'worker_website_DESC_NULLS_FIRST',
  WorkerWebsiteDescNullsLast = 'worker_website_DESC_NULLS_LAST',
}

export type WorkerRewardWhereInput = {
  AND?: InputMaybe<Array<WorkerRewardWhereInput>>;
  OR?: InputMaybe<Array<WorkerRewardWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakersReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakersReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakersReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stakersReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  worker?: InputMaybe<WorkerWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WorkerRewardsConnection = {
  __typename?: 'WorkerRewardsConnection';
  edges: Array<WorkerRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WorkerSnapshot = {
  __typename?: 'WorkerSnapshot';
  epoch: Epoch;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  uptime: Scalars['Float']['output'];
  worker: Worker;
};

export type WorkerSnapshotDay = {
  __typename?: 'WorkerSnapshotDay';
  timestamp: Scalars['DateTime']['output'];
  uptime: Scalars['Float']['output'];
};

export type WorkerSnapshotEdge = {
  __typename?: 'WorkerSnapshotEdge';
  cursor: Scalars['String']['output'];
  node: WorkerSnapshot;
};

export enum WorkerSnapshotOrderByInput {
  EpochEndAsc = 'epoch_end_ASC',
  EpochEndAscNullsFirst = 'epoch_end_ASC_NULLS_FIRST',
  EpochEndAscNullsLast = 'epoch_end_ASC_NULLS_LAST',
  EpochEndDesc = 'epoch_end_DESC',
  EpochEndDescNullsFirst = 'epoch_end_DESC_NULLS_FIRST',
  EpochEndDescNullsLast = 'epoch_end_DESC_NULLS_LAST',
  EpochEndedAtAsc = 'epoch_endedAt_ASC',
  EpochEndedAtAscNullsFirst = 'epoch_endedAt_ASC_NULLS_FIRST',
  EpochEndedAtAscNullsLast = 'epoch_endedAt_ASC_NULLS_LAST',
  EpochEndedAtDesc = 'epoch_endedAt_DESC',
  EpochEndedAtDescNullsFirst = 'epoch_endedAt_DESC_NULLS_FIRST',
  EpochEndedAtDescNullsLast = 'epoch_endedAt_DESC_NULLS_LAST',
  EpochIdAsc = 'epoch_id_ASC',
  EpochIdAscNullsFirst = 'epoch_id_ASC_NULLS_FIRST',
  EpochIdAscNullsLast = 'epoch_id_ASC_NULLS_LAST',
  EpochIdDesc = 'epoch_id_DESC',
  EpochIdDescNullsFirst = 'epoch_id_DESC_NULLS_FIRST',
  EpochIdDescNullsLast = 'epoch_id_DESC_NULLS_LAST',
  EpochNumberAsc = 'epoch_number_ASC',
  EpochNumberAscNullsFirst = 'epoch_number_ASC_NULLS_FIRST',
  EpochNumberAscNullsLast = 'epoch_number_ASC_NULLS_LAST',
  EpochNumberDesc = 'epoch_number_DESC',
  EpochNumberDescNullsFirst = 'epoch_number_DESC_NULLS_FIRST',
  EpochNumberDescNullsLast = 'epoch_number_DESC_NULLS_LAST',
  EpochStartAsc = 'epoch_start_ASC',
  EpochStartAscNullsFirst = 'epoch_start_ASC_NULLS_FIRST',
  EpochStartAscNullsLast = 'epoch_start_ASC_NULLS_LAST',
  EpochStartDesc = 'epoch_start_DESC',
  EpochStartDescNullsFirst = 'epoch_start_DESC_NULLS_FIRST',
  EpochStartDescNullsLast = 'epoch_start_DESC_NULLS_LAST',
  EpochStartedAtAsc = 'epoch_startedAt_ASC',
  EpochStartedAtAscNullsFirst = 'epoch_startedAt_ASC_NULLS_FIRST',
  EpochStartedAtAscNullsLast = 'epoch_startedAt_ASC_NULLS_LAST',
  EpochStartedAtDesc = 'epoch_startedAt_DESC',
  EpochStartedAtDescNullsFirst = 'epoch_startedAt_DESC_NULLS_FIRST',
  EpochStartedAtDescNullsLast = 'epoch_startedAt_DESC_NULLS_LAST',
  EpochStatusAsc = 'epoch_status_ASC',
  EpochStatusAscNullsFirst = 'epoch_status_ASC_NULLS_FIRST',
  EpochStatusAscNullsLast = 'epoch_status_ASC_NULLS_LAST',
  EpochStatusDesc = 'epoch_status_DESC',
  EpochStatusDescNullsFirst = 'epoch_status_DESC_NULLS_FIRST',
  EpochStatusDescNullsLast = 'epoch_status_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UptimeAsc = 'uptime_ASC',
  UptimeAscNullsFirst = 'uptime_ASC_NULLS_FIRST',
  UptimeAscNullsLast = 'uptime_ASC_NULLS_LAST',
  UptimeDesc = 'uptime_DESC',
  UptimeDescNullsFirst = 'uptime_DESC_NULLS_FIRST',
  UptimeDescNullsLast = 'uptime_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprAscNullsLast = 'worker_apr_ASC_NULLS_LAST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsFirst = 'worker_apr_DESC_NULLS_FIRST',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondAscNullsLast = 'worker_bond_ASC_NULLS_LAST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsFirst = 'worker_bond_DESC_NULLS_FIRST',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerCapedDelegationAsc = 'worker_capedDelegation_ASC',
  WorkerCapedDelegationAscNullsFirst = 'worker_capedDelegation_ASC_NULLS_FIRST',
  WorkerCapedDelegationAscNullsLast = 'worker_capedDelegation_ASC_NULLS_LAST',
  WorkerCapedDelegationDesc = 'worker_capedDelegation_DESC',
  WorkerCapedDelegationDescNullsFirst = 'worker_capedDelegation_DESC_NULLS_FIRST',
  WorkerCapedDelegationDescNullsLast = 'worker_capedDelegation_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardAscNullsLast = 'worker_claimableReward_ASC_NULLS_LAST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsFirst = 'worker_claimableReward_DESC_NULLS_FIRST',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardAscNullsLast = 'worker_claimedReward_ASC_NULLS_LAST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsFirst = 'worker_claimedReward_DESC_NULLS_FIRST',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtAscNullsLast = 'worker_createdAt_ASC_NULLS_LAST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsFirst = 'worker_createdAt_DESC_NULLS_FIRST',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDTenureAsc = 'worker_dTenure_ASC',
  WorkerDTenureAscNullsFirst = 'worker_dTenure_ASC_NULLS_FIRST',
  WorkerDTenureAscNullsLast = 'worker_dTenure_ASC_NULLS_LAST',
  WorkerDTenureDesc = 'worker_dTenure_DESC',
  WorkerDTenureDescNullsFirst = 'worker_dTenure_DESC_NULLS_FIRST',
  WorkerDTenureDescNullsLast = 'worker_dTenure_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountAscNullsLast = 'worker_delegationCount_ASC_NULLS_LAST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsFirst = 'worker_delegationCount_DESC_NULLS_FIRST',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionAscNullsLast = 'worker_description_ASC_NULLS_LAST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsFirst = 'worker_description_DESC_NULLS_FIRST',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkAscNullsLast = 'worker_dialOk_ASC_NULLS_LAST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsFirst = 'worker_dialOk_DESC_NULLS_FIRST',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailAscNullsLast = 'worker_email_ASC_NULLS_LAST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsFirst = 'worker_email_DESC_NULLS_FIRST',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailReasonAsc = 'worker_jailReason_ASC',
  WorkerJailReasonAscNullsFirst = 'worker_jailReason_ASC_NULLS_FIRST',
  WorkerJailReasonAscNullsLast = 'worker_jailReason_ASC_NULLS_LAST',
  WorkerJailReasonDesc = 'worker_jailReason_DESC',
  WorkerJailReasonDescNullsFirst = 'worker_jailReason_DESC_NULLS_FIRST',
  WorkerJailReasonDescNullsLast = 'worker_jailReason_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedAscNullsLast = 'worker_jailed_ASC_NULLS_LAST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsFirst = 'worker_jailed_DESC_NULLS_FIRST',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLivenessAsc = 'worker_liveness_ASC',
  WorkerLivenessAscNullsFirst = 'worker_liveness_ASC_NULLS_FIRST',
  WorkerLivenessAscNullsLast = 'worker_liveness_ASC_NULLS_LAST',
  WorkerLivenessDesc = 'worker_liveness_DESC',
  WorkerLivenessDescNullsFirst = 'worker_liveness_DESC_NULLS_FIRST',
  WorkerLivenessDescNullsLast = 'worker_liveness_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndAscNullsLast = 'worker_lockEnd_ASC_NULLS_LAST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsFirst = 'worker_lockEnd_DESC_NULLS_FIRST',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartAscNullsLast = 'worker_lockStart_ASC_NULLS_LAST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsFirst = 'worker_lockStart_DESC_NULLS_FIRST',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedAscNullsLast = 'worker_locked_ASC_NULLS_LAST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsFirst = 'worker_locked_DESC_NULLS_FIRST',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameAscNullsLast = 'worker_name_ASC_NULLS_LAST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsFirst = 'worker_name_DESC_NULLS_FIRST',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineAscNullsLast = 'worker_online_ASC_NULLS_LAST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsFirst = 'worker_online_DESC_NULLS_FIRST',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdAscNullsLast = 'worker_peerId_ASC_NULLS_LAST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsFirst = 'worker_peerId_DESC_NULLS_FIRST',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursAscNullsLast = 'worker_queries24Hours_ASC_NULLS_LAST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsFirst = 'worker_queries24Hours_DESC_NULLS_FIRST',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysAscNullsLast = 'worker_queries90Days_ASC_NULLS_LAST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsFirst = 'worker_queries90Days_DESC_NULLS_FIRST',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursAscNullsLast = 'worker_scannedData24Hours_ASC_NULLS_LAST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsFirst = 'worker_scannedData24Hours_DESC_NULLS_FIRST',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysAscNullsLast = 'worker_scannedData90Days_ASC_NULLS_LAST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsFirst = 'worker_scannedData90Days_DESC_NULLS_FIRST',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursAscNullsLast = 'worker_servedData24Hours_ASC_NULLS_LAST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsFirst = 'worker_servedData24Hours_DESC_NULLS_FIRST',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysAscNullsLast = 'worker_servedData90Days_ASC_NULLS_LAST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsFirst = 'worker_servedData90Days_DESC_NULLS_FIRST',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprAscNullsLast = 'worker_stakerApr_ASC_NULLS_LAST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsFirst = 'worker_stakerApr_DESC_NULLS_FIRST',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusAscNullsLast = 'worker_status_ASC_NULLS_LAST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsFirst = 'worker_status_DESC_NULLS_FIRST',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataAscNullsLast = 'worker_storedData_ASC_NULLS_LAST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsFirst = 'worker_storedData_DESC_NULLS_FIRST',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationRewardsAsc = 'worker_totalDelegationRewards_ASC',
  WorkerTotalDelegationRewardsAscNullsFirst = 'worker_totalDelegationRewards_ASC_NULLS_FIRST',
  WorkerTotalDelegationRewardsAscNullsLast = 'worker_totalDelegationRewards_ASC_NULLS_LAST',
  WorkerTotalDelegationRewardsDesc = 'worker_totalDelegationRewards_DESC',
  WorkerTotalDelegationRewardsDescNullsFirst = 'worker_totalDelegationRewards_DESC_NULLS_FIRST',
  WorkerTotalDelegationRewardsDescNullsLast = 'worker_totalDelegationRewards_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationAscNullsLast = 'worker_totalDelegation_ASC_NULLS_LAST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsFirst = 'worker_totalDelegation_DESC_NULLS_FIRST',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerTrafficWeightAsc = 'worker_trafficWeight_ASC',
  WorkerTrafficWeightAscNullsFirst = 'worker_trafficWeight_ASC_NULLS_FIRST',
  WorkerTrafficWeightAscNullsLast = 'worker_trafficWeight_ASC_NULLS_LAST',
  WorkerTrafficWeightDesc = 'worker_trafficWeight_DESC',
  WorkerTrafficWeightDescNullsFirst = 'worker_trafficWeight_DESC_NULLS_FIRST',
  WorkerTrafficWeightDescNullsLast = 'worker_trafficWeight_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursAscNullsLast = 'worker_uptime24Hours_ASC_NULLS_LAST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsFirst = 'worker_uptime24Hours_DESC_NULLS_FIRST',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysAscNullsLast = 'worker_uptime90Days_ASC_NULLS_LAST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsFirst = 'worker_uptime90Days_DESC_NULLS_FIRST',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionAscNullsLast = 'worker_version_ASC_NULLS_LAST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsFirst = 'worker_version_DESC_NULLS_FIRST',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteAscNullsLast = 'worker_website_ASC_NULLS_LAST',
  WorkerWebsiteDesc = 'worker_website_DESC',
  WorkerWebsiteDescNullsFirst = 'worker_website_DESC_NULLS_FIRST',
  WorkerWebsiteDescNullsLast = 'worker_website_DESC_NULLS_LAST',
}

export type WorkerSnapshotWhereInput = {
  AND?: InputMaybe<Array<WorkerSnapshotWhereInput>>;
  OR?: InputMaybe<Array<WorkerSnapshotWhereInput>>;
  epoch?: InputMaybe<EpochWhereInput>;
  epoch_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  uptime_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime_gt?: InputMaybe<Scalars['Float']['input']>;
  uptime_gte?: InputMaybe<Scalars['Float']['input']>;
  uptime_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  uptime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  uptime_lt?: InputMaybe<Scalars['Float']['input']>;
  uptime_lte?: InputMaybe<Scalars['Float']['input']>;
  uptime_not_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  worker?: InputMaybe<WorkerWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WorkerSnapshotsConnection = {
  __typename?: 'WorkerSnapshotsConnection';
  edges: Array<WorkerSnapshotEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum WorkerStatus {
  Active = 'ACTIVE',
  Deregistered = 'DEREGISTERED',
  Deregistering = 'DEREGISTERING',
  Registering = 'REGISTERING',
  Unknown = 'UNKNOWN',
  Withdrawn = 'WITHDRAWN',
}

export type WorkerStatusChange = {
  __typename?: 'WorkerStatusChange';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  pending: Scalars['Boolean']['output'];
  status: WorkerStatus;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  worker: Worker;
};

export type WorkerStatusChangeEdge = {
  __typename?: 'WorkerStatusChangeEdge';
  cursor: Scalars['String']['output'];
  node: WorkerStatusChange;
};

export enum WorkerStatusChangeOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PendingAsc = 'pending_ASC',
  PendingAscNullsFirst = 'pending_ASC_NULLS_FIRST',
  PendingAscNullsLast = 'pending_ASC_NULLS_LAST',
  PendingDesc = 'pending_DESC',
  PendingDescNullsFirst = 'pending_DESC_NULLS_FIRST',
  PendingDescNullsLast = 'pending_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprAscNullsLast = 'worker_apr_ASC_NULLS_LAST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsFirst = 'worker_apr_DESC_NULLS_FIRST',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondAscNullsLast = 'worker_bond_ASC_NULLS_LAST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsFirst = 'worker_bond_DESC_NULLS_FIRST',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerCapedDelegationAsc = 'worker_capedDelegation_ASC',
  WorkerCapedDelegationAscNullsFirst = 'worker_capedDelegation_ASC_NULLS_FIRST',
  WorkerCapedDelegationAscNullsLast = 'worker_capedDelegation_ASC_NULLS_LAST',
  WorkerCapedDelegationDesc = 'worker_capedDelegation_DESC',
  WorkerCapedDelegationDescNullsFirst = 'worker_capedDelegation_DESC_NULLS_FIRST',
  WorkerCapedDelegationDescNullsLast = 'worker_capedDelegation_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardAscNullsLast = 'worker_claimableReward_ASC_NULLS_LAST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsFirst = 'worker_claimableReward_DESC_NULLS_FIRST',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardAscNullsLast = 'worker_claimedReward_ASC_NULLS_LAST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsFirst = 'worker_claimedReward_DESC_NULLS_FIRST',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtAscNullsLast = 'worker_createdAt_ASC_NULLS_LAST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsFirst = 'worker_createdAt_DESC_NULLS_FIRST',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDTenureAsc = 'worker_dTenure_ASC',
  WorkerDTenureAscNullsFirst = 'worker_dTenure_ASC_NULLS_FIRST',
  WorkerDTenureAscNullsLast = 'worker_dTenure_ASC_NULLS_LAST',
  WorkerDTenureDesc = 'worker_dTenure_DESC',
  WorkerDTenureDescNullsFirst = 'worker_dTenure_DESC_NULLS_FIRST',
  WorkerDTenureDescNullsLast = 'worker_dTenure_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountAscNullsLast = 'worker_delegationCount_ASC_NULLS_LAST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsFirst = 'worker_delegationCount_DESC_NULLS_FIRST',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionAscNullsLast = 'worker_description_ASC_NULLS_LAST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsFirst = 'worker_description_DESC_NULLS_FIRST',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkAscNullsLast = 'worker_dialOk_ASC_NULLS_LAST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsFirst = 'worker_dialOk_DESC_NULLS_FIRST',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailAscNullsLast = 'worker_email_ASC_NULLS_LAST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsFirst = 'worker_email_DESC_NULLS_FIRST',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailReasonAsc = 'worker_jailReason_ASC',
  WorkerJailReasonAscNullsFirst = 'worker_jailReason_ASC_NULLS_FIRST',
  WorkerJailReasonAscNullsLast = 'worker_jailReason_ASC_NULLS_LAST',
  WorkerJailReasonDesc = 'worker_jailReason_DESC',
  WorkerJailReasonDescNullsFirst = 'worker_jailReason_DESC_NULLS_FIRST',
  WorkerJailReasonDescNullsLast = 'worker_jailReason_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedAscNullsLast = 'worker_jailed_ASC_NULLS_LAST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsFirst = 'worker_jailed_DESC_NULLS_FIRST',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLivenessAsc = 'worker_liveness_ASC',
  WorkerLivenessAscNullsFirst = 'worker_liveness_ASC_NULLS_FIRST',
  WorkerLivenessAscNullsLast = 'worker_liveness_ASC_NULLS_LAST',
  WorkerLivenessDesc = 'worker_liveness_DESC',
  WorkerLivenessDescNullsFirst = 'worker_liveness_DESC_NULLS_FIRST',
  WorkerLivenessDescNullsLast = 'worker_liveness_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndAscNullsLast = 'worker_lockEnd_ASC_NULLS_LAST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsFirst = 'worker_lockEnd_DESC_NULLS_FIRST',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartAscNullsLast = 'worker_lockStart_ASC_NULLS_LAST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsFirst = 'worker_lockStart_DESC_NULLS_FIRST',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedAscNullsLast = 'worker_locked_ASC_NULLS_LAST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsFirst = 'worker_locked_DESC_NULLS_FIRST',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameAscNullsLast = 'worker_name_ASC_NULLS_LAST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsFirst = 'worker_name_DESC_NULLS_FIRST',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineAscNullsLast = 'worker_online_ASC_NULLS_LAST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsFirst = 'worker_online_DESC_NULLS_FIRST',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdAscNullsLast = 'worker_peerId_ASC_NULLS_LAST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsFirst = 'worker_peerId_DESC_NULLS_FIRST',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursAscNullsLast = 'worker_queries24Hours_ASC_NULLS_LAST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsFirst = 'worker_queries24Hours_DESC_NULLS_FIRST',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysAscNullsLast = 'worker_queries90Days_ASC_NULLS_LAST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsFirst = 'worker_queries90Days_DESC_NULLS_FIRST',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursAscNullsLast = 'worker_scannedData24Hours_ASC_NULLS_LAST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsFirst = 'worker_scannedData24Hours_DESC_NULLS_FIRST',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysAscNullsLast = 'worker_scannedData90Days_ASC_NULLS_LAST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsFirst = 'worker_scannedData90Days_DESC_NULLS_FIRST',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursAscNullsLast = 'worker_servedData24Hours_ASC_NULLS_LAST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsFirst = 'worker_servedData24Hours_DESC_NULLS_FIRST',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysAscNullsLast = 'worker_servedData90Days_ASC_NULLS_LAST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsFirst = 'worker_servedData90Days_DESC_NULLS_FIRST',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprAscNullsLast = 'worker_stakerApr_ASC_NULLS_LAST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsFirst = 'worker_stakerApr_DESC_NULLS_FIRST',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusAscNullsLast = 'worker_status_ASC_NULLS_LAST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsFirst = 'worker_status_DESC_NULLS_FIRST',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataAscNullsLast = 'worker_storedData_ASC_NULLS_LAST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsFirst = 'worker_storedData_DESC_NULLS_FIRST',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationRewardsAsc = 'worker_totalDelegationRewards_ASC',
  WorkerTotalDelegationRewardsAscNullsFirst = 'worker_totalDelegationRewards_ASC_NULLS_FIRST',
  WorkerTotalDelegationRewardsAscNullsLast = 'worker_totalDelegationRewards_ASC_NULLS_LAST',
  WorkerTotalDelegationRewardsDesc = 'worker_totalDelegationRewards_DESC',
  WorkerTotalDelegationRewardsDescNullsFirst = 'worker_totalDelegationRewards_DESC_NULLS_FIRST',
  WorkerTotalDelegationRewardsDescNullsLast = 'worker_totalDelegationRewards_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationAscNullsLast = 'worker_totalDelegation_ASC_NULLS_LAST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsFirst = 'worker_totalDelegation_DESC_NULLS_FIRST',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerTrafficWeightAsc = 'worker_trafficWeight_ASC',
  WorkerTrafficWeightAscNullsFirst = 'worker_trafficWeight_ASC_NULLS_FIRST',
  WorkerTrafficWeightAscNullsLast = 'worker_trafficWeight_ASC_NULLS_LAST',
  WorkerTrafficWeightDesc = 'worker_trafficWeight_DESC',
  WorkerTrafficWeightDescNullsFirst = 'worker_trafficWeight_DESC_NULLS_FIRST',
  WorkerTrafficWeightDescNullsLast = 'worker_trafficWeight_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursAscNullsLast = 'worker_uptime24Hours_ASC_NULLS_LAST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsFirst = 'worker_uptime24Hours_DESC_NULLS_FIRST',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysAscNullsLast = 'worker_uptime90Days_ASC_NULLS_LAST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsFirst = 'worker_uptime90Days_DESC_NULLS_FIRST',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionAscNullsLast = 'worker_version_ASC_NULLS_LAST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsFirst = 'worker_version_DESC_NULLS_FIRST',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteAscNullsLast = 'worker_website_ASC_NULLS_LAST',
  WorkerWebsiteDesc = 'worker_website_DESC',
  WorkerWebsiteDescNullsFirst = 'worker_website_DESC_NULLS_FIRST',
  WorkerWebsiteDescNullsLast = 'worker_website_DESC_NULLS_LAST',
}

export type WorkerStatusChangeWhereInput = {
  AND?: InputMaybe<Array<WorkerStatusChangeWhereInput>>;
  OR?: InputMaybe<Array<WorkerStatusChangeWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  pending_eq?: InputMaybe<Scalars['Boolean']['input']>;
  pending_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pending_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  status_eq?: InputMaybe<WorkerStatus>;
  status_in?: InputMaybe<Array<WorkerStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<WorkerStatus>;
  status_not_in?: InputMaybe<Array<WorkerStatus>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  worker?: InputMaybe<WorkerWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WorkerStatusChangesConnection = {
  __typename?: 'WorkerStatusChangesConnection';
  edges: Array<WorkerStatusChangeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WorkerWhereInput = {
  AND?: InputMaybe<Array<WorkerWhereInput>>;
  OR?: InputMaybe<Array<WorkerWhereInput>>;
  apr_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_gt?: InputMaybe<Scalars['Float']['input']>;
  apr_gte?: InputMaybe<Scalars['Float']['input']>;
  apr_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apr_lt?: InputMaybe<Scalars['Float']['input']>;
  apr_lte?: InputMaybe<Scalars['Float']['input']>;
  apr_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  bond_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bond_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bond_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bond_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bond_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  capedDelegation_eq?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  capedDelegation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  capedDelegation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  capedDelegation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimableReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimableReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimableReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimableReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimedReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claims_every?: InputMaybe<ClaimWhereInput>;
  claims_none?: InputMaybe<ClaimWhereInput>;
  claims_some?: InputMaybe<ClaimWhereInput>;
  createdAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  dTenure_eq?: InputMaybe<Scalars['Float']['input']>;
  dTenure_gt?: InputMaybe<Scalars['Float']['input']>;
  dTenure_gte?: InputMaybe<Scalars['Float']['input']>;
  dTenure_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  dTenure_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dTenure_lt?: InputMaybe<Scalars['Float']['input']>;
  dTenure_lte?: InputMaybe<Scalars['Float']['input']>;
  dTenure_not_eq?: InputMaybe<Scalars['Float']['input']>;
  dTenure_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  dayUptimes_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegationCount_eq?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegations_every?: InputMaybe<DelegationWhereInput>;
  delegations_none?: InputMaybe<DelegationWhereInput>;
  delegations_some?: InputMaybe<DelegationWhereInput>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  dialOk_eq?: InputMaybe<Scalars['Boolean']['input']>;
  dialOk_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dialOk_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  email_contains?: InputMaybe<Scalars['String']['input']>;
  email_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  email_endsWith?: InputMaybe<Scalars['String']['input']>;
  email_eq?: InputMaybe<Scalars['String']['input']>;
  email_gt?: InputMaybe<Scalars['String']['input']>;
  email_gte?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  email_lt?: InputMaybe<Scalars['String']['input']>;
  email_lte?: InputMaybe<Scalars['String']['input']>;
  email_not_contains?: InputMaybe<Scalars['String']['input']>;
  email_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  email_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  email_not_eq?: InputMaybe<Scalars['String']['input']>;
  email_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  email_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  jailReason_contains?: InputMaybe<Scalars['String']['input']>;
  jailReason_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  jailReason_endsWith?: InputMaybe<Scalars['String']['input']>;
  jailReason_eq?: InputMaybe<Scalars['String']['input']>;
  jailReason_gt?: InputMaybe<Scalars['String']['input']>;
  jailReason_gte?: InputMaybe<Scalars['String']['input']>;
  jailReason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  jailReason_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  jailReason_lt?: InputMaybe<Scalars['String']['input']>;
  jailReason_lte?: InputMaybe<Scalars['String']['input']>;
  jailReason_not_contains?: InputMaybe<Scalars['String']['input']>;
  jailReason_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  jailReason_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  jailReason_not_eq?: InputMaybe<Scalars['String']['input']>;
  jailReason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  jailReason_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  jailReason_startsWith?: InputMaybe<Scalars['String']['input']>;
  jailed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  jailed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  jailed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  liveness_eq?: InputMaybe<Scalars['Float']['input']>;
  liveness_gt?: InputMaybe<Scalars['Float']['input']>;
  liveness_gte?: InputMaybe<Scalars['Float']['input']>;
  liveness_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  liveness_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liveness_lt?: InputMaybe<Scalars['Float']['input']>;
  liveness_lte?: InputMaybe<Scalars['Float']['input']>;
  liveness_not_eq?: InputMaybe<Scalars['Float']['input']>;
  liveness_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lockEnd_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockEnd_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockEnd_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_gte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockStart_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockStart_lt?: InputMaybe<Scalars['Int']['input']>;
  lockStart_lte?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lockStart_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  locked_eq?: InputMaybe<Scalars['Boolean']['input']>;
  locked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  locked_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  online_eq?: InputMaybe<Scalars['Boolean']['input']>;
  online_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  online_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  peerId_contains?: InputMaybe<Scalars['String']['input']>;
  peerId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  peerId_endsWith?: InputMaybe<Scalars['String']['input']>;
  peerId_eq?: InputMaybe<Scalars['String']['input']>;
  peerId_gt?: InputMaybe<Scalars['String']['input']>;
  peerId_gte?: InputMaybe<Scalars['String']['input']>;
  peerId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  peerId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  peerId_lt?: InputMaybe<Scalars['String']['input']>;
  peerId_lte?: InputMaybe<Scalars['String']['input']>;
  peerId_not_contains?: InputMaybe<Scalars['String']['input']>;
  peerId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  peerId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  peerId_not_eq?: InputMaybe<Scalars['String']['input']>;
  peerId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  peerId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  peerId_startsWith?: InputMaybe<Scalars['String']['input']>;
  queries24Hours_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queries24Hours_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  queries24Hours_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queries24Hours_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queries90Days_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queries90Days_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  queries90Days_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queries90Days_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  realOwner?: InputMaybe<AccountWhereInput>;
  realOwner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewards_every?: InputMaybe<WorkerRewardWhereInput>;
  rewards_none?: InputMaybe<WorkerRewardWhereInput>;
  rewards_some?: InputMaybe<WorkerRewardWhereInput>;
  scannedData24Hours_eq?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_gt?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_gte?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scannedData24Hours_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scannedData24Hours_lt?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_lte?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData24Hours_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scannedData90Days_eq?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_gt?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_gte?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scannedData90Days_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scannedData90Days_lt?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_lte?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  scannedData90Days_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  servedData24Hours_eq?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_gt?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_gte?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  servedData24Hours_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  servedData24Hours_lt?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_lte?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  servedData24Hours_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  servedData90Days_eq?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_gt?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_gte?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  servedData90Days_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  servedData90Days_lt?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_lte?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  servedData90Days_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  snapshots_every?: InputMaybe<WorkerSnapshotWhereInput>;
  snapshots_none?: InputMaybe<WorkerSnapshotWhereInput>;
  snapshots_some?: InputMaybe<WorkerSnapshotWhereInput>;
  stakerApr_eq?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_gt?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_gte?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  stakerApr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakerApr_lt?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_lte?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_not_eq?: InputMaybe<Scalars['Float']['input']>;
  stakerApr_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  statusHistory_every?: InputMaybe<WorkerStatusChangeWhereInput>;
  statusHistory_none?: InputMaybe<WorkerStatusChangeWhereInput>;
  statusHistory_some?: InputMaybe<WorkerStatusChangeWhereInput>;
  status_eq?: InputMaybe<WorkerStatus>;
  status_in?: InputMaybe<Array<WorkerStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<WorkerStatus>;
  status_not_in?: InputMaybe<Array<WorkerStatus>>;
  storedData_eq?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_gt?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_gte?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  storedData_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  storedData_lt?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_lte?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  storedData_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegationRewards_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegationRewards_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalDelegationRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegationRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegation_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalDelegation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trafficWeight_eq?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_gt?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_gte?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  trafficWeight_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  trafficWeight_lt?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_lte?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_not_eq?: InputMaybe<Scalars['Float']['input']>;
  trafficWeight_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  uptime24Hours_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_gt?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_gte?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  uptime24Hours_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  uptime24Hours_lt?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_lte?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_not_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime24Hours_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  uptime90Days_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_gt?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_gte?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  uptime90Days_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  uptime90Days_lt?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_lte?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_not_eq?: InputMaybe<Scalars['Float']['input']>;
  uptime90Days_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  version_contains?: InputMaybe<Scalars['String']['input']>;
  version_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  version_endsWith?: InputMaybe<Scalars['String']['input']>;
  version_eq?: InputMaybe<Scalars['String']['input']>;
  version_gt?: InputMaybe<Scalars['String']['input']>;
  version_gte?: InputMaybe<Scalars['String']['input']>;
  version_in?: InputMaybe<Array<Scalars['String']['input']>>;
  version_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  version_lt?: InputMaybe<Scalars['String']['input']>;
  version_lte?: InputMaybe<Scalars['String']['input']>;
  version_not_contains?: InputMaybe<Scalars['String']['input']>;
  version_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  version_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  version_not_eq?: InputMaybe<Scalars['String']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  version_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  version_startsWith?: InputMaybe<Scalars['String']['input']>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  website_endsWith?: InputMaybe<Scalars['String']['input']>;
  website_eq?: InputMaybe<Scalars['String']['input']>;
  website_gt?: InputMaybe<Scalars['String']['input']>;
  website_gte?: InputMaybe<Scalars['String']['input']>;
  website_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  website_lt?: InputMaybe<Scalars['String']['input']>;
  website_lte?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  website_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  website_not_eq?: InputMaybe<Scalars['String']['input']>;
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  website_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type WorkersConnection = {
  __typename?: 'WorkersConnection';
  edges: Array<WorkerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidNetworkHeightQueryVariables = Exact<{ [key: string]: never }>;

export type SquidNetworkHeightQuery = {
  __typename?: 'Query';
  squidStatus: { __typename?: 'SquidStatus'; height: number };
};

export type SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsQuery = {
  __typename?: 'Query';
  settingsConnection: {
    __typename?: 'SettingsConnection';
    edges: Array<{
      __typename?: 'SettingsEdge';
      node: {
        __typename?: 'Settings';
        id: string;
        bondAmount?: string;
        delegationLimitCoefficient: number;
        minimalWorkerVersion?: string;
        recommendedWorkerVersion?: string;
      };
    }>;
  };
};

export type AccountQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type AccountQuery = {
  __typename?: 'Query';
  accountById?: {
    __typename?: 'Account';
    id: string;
    type: AccountType;
    balance: string;
    owned: Array<{ __typename?: 'Account'; id: string; type: AccountType; balance: string }>;
  };
};

export type WorkerBaseFragmentFragment = {
  __typename?: 'Worker';
  id: string;
  name?: string;
  peerId: string;
};

export type WorkerStatusFragmentFragment = {
  __typename?: 'Worker';
  status: WorkerStatus;
  online?: boolean;
  jailed?: boolean;
  dialOk?: boolean;
  jailReason?: string;
};

export type WorkerFragmentFragment = {
  __typename?: 'Worker';
  version?: string;
  createdAt: string;
  uptime90Days?: number;
  apr?: number;
  stakerApr?: number;
  totalDelegation: string;
  capedDelegation: string;
  id: string;
  name?: string;
  peerId: string;
  status: WorkerStatus;
  online?: boolean;
  jailed?: boolean;
  dialOk?: boolean;
  jailReason?: string;
};

export type WorkerFullFragmentFragment = {
  __typename?: 'Worker';
  bond: string;
  claimableReward: string;
  claimedReward: string;
  uptime24Hours?: number;
  delegationCount: number;
  locked?: boolean;
  totalDelegationRewards: string;
  website?: string;
  email?: string;
  description?: string;
  queries24Hours?: string;
  queries90Days?: string;
  scannedData24Hours?: string;
  scannedData90Days?: string;
  servedData24Hours?: string;
  servedData90Days?: string;
  storedData?: string;
  version?: string;
  createdAt: string;
  uptime90Days?: number;
  apr?: number;
  stakerApr?: number;
  totalDelegation: string;
  capedDelegation: string;
  id: string;
  name?: string;
  peerId: string;
  status: WorkerStatus;
  online?: boolean;
  jailed?: boolean;
  dialOk?: boolean;
  jailReason?: string;
  dayUptimes?: Array<{ __typename?: 'WorkerDayUptime'; timestamp: string; uptime: number }>;
  owner: { __typename?: 'Account'; id: string; type: AccountType };
  realOwner: { __typename?: 'Account'; id: string };
};

export type AllWorkersQueryVariables = Exact<{ [key: string]: never }>;

export type AllWorkersQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    version?: string;
    createdAt: string;
    uptime90Days?: number;
    apr?: number;
    stakerApr?: number;
    totalDelegation: string;
    capedDelegation: string;
    id: string;
    name?: string;
    peerId: string;
    status: WorkerStatus;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    jailReason?: string;
  }>;
};

export type WorkerByPeerIdQueryVariables = Exact<{
  peerId: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
}>;

export type WorkerByPeerIdQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    bond: string;
    claimableReward: string;
    claimedReward: string;
    uptime24Hours?: number;
    delegationCount: number;
    locked?: boolean;
    totalDelegationRewards: string;
    website?: string;
    email?: string;
    description?: string;
    queries24Hours?: string;
    queries90Days?: string;
    scannedData24Hours?: string;
    scannedData90Days?: string;
    servedData24Hours?: string;
    servedData90Days?: string;
    storedData?: string;
    version?: string;
    createdAt: string;
    uptime90Days?: number;
    apr?: number;
    stakerApr?: number;
    totalDelegation: string;
    capedDelegation: string;
    id: string;
    name?: string;
    peerId: string;
    status: WorkerStatus;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    jailReason?: string;
    delegations: Array<{
      __typename?: 'Delegation';
      claimableReward: string;
      claimedReward: string;
      deposit: string;
      locked?: boolean;
      owner: { __typename?: 'Account'; id: string; type: AccountType };
    }>;
    dayUptimes?: Array<{ __typename?: 'WorkerDayUptime'; timestamp: string; uptime: number }>;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    realOwner: { __typename?: 'Account'; id: string };
  }>;
};

export type WorkerDaysUptimeByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
}>;

export type WorkerDaysUptimeByIdQuery = {
  __typename?: 'Query';
  workerSnapshotsByDay: Array<{
    __typename?: 'WorkerSnapshotDay';
    timestamp: string;
    uptime: number;
  }>;
};

export type MyWorkersQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyWorkersQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    uptime24Hours?: number;
    claimableReward: string;
    claimedReward: string;
    version?: string;
    createdAt: string;
    uptime90Days?: number;
    apr?: number;
    stakerApr?: number;
    totalDelegation: string;
    capedDelegation: string;
    id: string;
    name?: string;
    peerId: string;
    status: WorkerStatus;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    jailReason?: string;
  }>;
};

export type MyWorkersCountQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyWorkersCountQuery = {
  __typename?: 'Query';
  workersConnection: { __typename?: 'WorkersConnection'; totalCount: number };
};

export type WorkerDelegationInfoQueryVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;

export type WorkerDelegationInfoQuery = {
  __typename?: 'Query';
  workerById?: {
    __typename?: 'Worker';
    bond: string;
    totalDelegation: string;
    capedDelegation: string;
    liveness?: number;
    dTenure?: number;
    trafficWeight?: number;
  };
  statistics: Array<{ __typename?: 'Statistics'; utilizedStake: string; baseApr: number }>;
};

export type WorkerOwnerQueryVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;

export type WorkerOwnerQuery = {
  __typename?: 'Query';
  workerById?: {
    __typename?: 'Worker';
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    realOwner: { __typename?: 'Account'; id: string };
  };
};

export type MyWorkerDelegationsQueryVariables = Exact<{
  address: Scalars['String']['input'];
  workerId: Scalars['String']['input'];
}>;

export type MyWorkerDelegationsQuery = {
  __typename?: 'Query';
  workerById?: {
    __typename?: 'Worker';
    delegations: Array<{
      __typename?: 'Delegation';
      claimableReward: string;
      claimedReward: string;
      deposit: string;
      locked?: boolean;
      owner: { __typename?: 'Account'; id: string; type: AccountType };
    }>;
  };
};

export type MyAssetsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyAssetsQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename?: 'Account';
    balance: string;
    owned: Array<{ __typename?: 'Account'; id: string; balance: string }>;
  }>;
  workers: Array<{
    __typename?: 'Worker';
    bond: string;
    claimableReward: string;
    id: string;
    name?: string;
    peerId: string;
  }>;
  delegations: Array<{ __typename?: 'Delegation'; claimableReward: string; deposit: string }>;
};

export type MyDelegationsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyDelegationsQuery = {
  __typename?: 'Query';
  delegations: Array<{
    __typename?: 'Delegation';
    claimableReward: string;
    claimedReward: string;
    deposit: string;
    locked?: boolean;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    worker: {
      __typename?: 'Worker';
      totalDelegation: string;
      capedDelegation: string;
      version?: string;
      createdAt: string;
      uptime90Days?: number;
      apr?: number;
      stakerApr?: number;
      id: string;
      name?: string;
      peerId: string;
      status: WorkerStatus;
      online?: boolean;
      jailed?: boolean;
      dialOk?: boolean;
      jailReason?: string;
    };
  }>;
};

export type MyClaimsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyClaimsQuery = {
  __typename?: 'Query';
  delegations: Array<{
    __typename?: 'Delegation';
    claimableReward: string;
    deposit: string;
    worker: { __typename?: 'Worker'; id: string; name?: string; peerId: string };
    owner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
  workers: Array<{
    __typename?: 'Worker';
    claimableReward: string;
    id: string;
    name?: string;
    peerId: string;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
};

export type GatewayFragmentFragment = {
  __typename?: 'Gateway';
  id: string;
  name?: string;
  status: GatewayStatus;
  description?: string;
  email?: string;
  endpointUrl?: string;
  website?: string;
  createdAt: string;
  owner: { __typename?: 'Account'; id: string; type: AccountType };
  realOwner: { __typename?: 'Account'; id: string; type: AccountType };
};

export type GatewayByPeerIdQueryVariables = Exact<{
  peerId: Scalars['String']['input'];
}>;

export type GatewayByPeerIdQuery = {
  __typename?: 'Query';
  gatewayById?: {
    __typename?: 'Gateway';
    id: string;
    name?: string;
    status: GatewayStatus;
    description?: string;
    email?: string;
    endpointUrl?: string;
    website?: string;
    createdAt: string;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    realOwner: { __typename?: 'Account'; id: string; type: AccountType };
  };
};

export type GatewayStakeFragmentFragment = {
  __typename?: 'GatewayStake';
  autoExtension: boolean;
  amount: string;
  computationUnits: string;
  computationUnitsPending?: string;
  locked: boolean;
  lockStart?: number;
  lockEnd?: number;
  owner: { __typename?: 'Account'; id: string; type: AccountType };
  realOwner: { __typename?: 'Account'; id: string; type: AccountType };
};

export type MyGatewaysQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyGatewaysQuery = {
  __typename?: 'Query';
  gateways: Array<{
    __typename?: 'Gateway';
    id: string;
    name?: string;
    status: GatewayStatus;
    description?: string;
    email?: string;
    endpointUrl?: string;
    website?: string;
    createdAt: string;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    realOwner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
};

export type MyGatewayStakesQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyGatewayStakesQuery = {
  __typename?: 'Query';
  gatewayStakes: Array<{
    __typename?: 'GatewayStake';
    autoExtension: boolean;
    amount: string;
    computationUnits: string;
    computationUnitsPending?: string;
    locked: boolean;
    lockStart?: number;
    lockEnd?: number;
    owner: { __typename?: 'Account'; id: string; type: AccountType };
    realOwner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
  networkStats: {
    __typename?: 'NetworkStats';
    blockTimeL1: number;
    lastBlockL1: number;
    lastBlockTimestampL1: string;
  };
};

export type VestingFragmentFragment = {
  __typename?: 'Account';
  id: string;
  type: AccountType;
  balance: string;
  owner?: { __typename?: 'Account'; id: string };
};

export type VestingByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type VestingByAddressQuery = {
  __typename?: 'Query';
  accountById?: {
    __typename?: 'Account';
    id: string;
    type: AccountType;
    balance: string;
    owner?: { __typename?: 'Account'; id: string };
  };
};

export type NetworkSummaryQueryVariables = Exact<{ [key: string]: never }>;

export type NetworkSummaryQuery = {
  __typename?: 'Query';
  networkStats: {
    __typename?: 'NetworkStats';
    onlineWorkersCount: number;
    queries90Days: string;
    queries24Hours: string;
    servedData90Days: string;
    servedData24Hours: string;
    stakerApr: number;
    totalBond: string;
    totalDelegation: string;
    storedData: string;
    workerApr: number;
    workersCount: number;
    aprs: Array<{
      __typename?: 'AprSnapshot';
      stakerApr: number;
      timestamp: string;
      workerApr: number;
    }>;
  };
};

export type CurrentEpochQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentEpochQuery = {
  __typename?: 'Query';
  networkStats: {
    __typename?: 'NetworkStats';
    blockTimeL1: number;
    lastBlockL1: number;
    lastBlockTimestampL1: string;
  };
  epoches: Array<{ __typename?: 'Epoch'; number: number; start: number; end: number }>;
};

export const WorkerBaseFragmentFragmentDoc = `
    fragment WorkerBaseFragment on Worker {
  id
  name
  peerId
}
    `;
export const WorkerStatusFragmentFragmentDoc = `
    fragment WorkerStatusFragment on Worker {
  status
  online
  jailed
  dialOk
  jailReason
}
    `;
export const WorkerFragmentFragmentDoc = `
    fragment WorkerFragment on Worker {
  ...WorkerBaseFragment
  ...WorkerStatusFragment
  version
  createdAt
  uptime90Days
  apr
  stakerApr
  totalDelegation
  capedDelegation
}
    ${WorkerBaseFragmentFragmentDoc}
${WorkerStatusFragmentFragmentDoc}`;
export const WorkerFullFragmentFragmentDoc = `
    fragment WorkerFullFragment on Worker {
  ...WorkerFragment
  bond
  claimableReward
  claimedReward
  uptime24Hours
  delegationCount
  locked
  totalDelegationRewards
  website
  email
  description
  queries24Hours
  queries90Days
  scannedData24Hours
  scannedData90Days
  servedData24Hours
  servedData90Days
  storedData
  dayUptimes {
    timestamp
    uptime
  }
  owner {
    id
    type
  }
  realOwner {
    id
  }
}
    ${WorkerFragmentFragmentDoc}`;
export const GatewayFragmentFragmentDoc = `
    fragment GatewayFragment on Gateway {
  id
  name
  status
  description
  email
  endpointUrl
  website
  createdAt
  owner {
    id
    type
  }
  realOwner {
    id
    type
  }
}
    `;
export const GatewayStakeFragmentFragmentDoc = `
    fragment GatewayStakeFragment on GatewayStake {
  owner {
    id
    type
  }
  realOwner {
    id
    type
  }
  autoExtension
  amount
  computationUnits
  computationUnitsPending
  locked
  lockStart
  lockEnd
}
    `;
export const VestingFragmentFragmentDoc = `
    fragment VestingFragment on Account {
  id
  type
  balance
  owner {
    id
  }
}
    `;
export const SquidNetworkHeightDocument = `
    query squidNetworkHeight {
  squidStatus {
    height
  }
}
    `;

export const useSquidNetworkHeightQuery = <TData = SquidNetworkHeightQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: SquidNetworkHeightQueryVariables,
  options?: Omit<UseQueryOptions<SquidNetworkHeightQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<SquidNetworkHeightQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<SquidNetworkHeightQuery, TError, TData>({
    queryKey: variables === undefined ? ['squidNetworkHeight'] : ['squidNetworkHeight', variables],
    queryFn: fetcher<SquidNetworkHeightQuery, SquidNetworkHeightQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      SquidNetworkHeightDocument,
      variables,
    ),
    ...options,
  });
};

export const SettingsDocument = `
    query settings {
  settingsConnection(orderBy: id_ASC) {
    edges {
      node {
        id
        bondAmount
        delegationLimitCoefficient
        minimalWorkerVersion
        recommendedWorkerVersion
      }
    }
  }
}
    `;

export const useSettingsQuery = <TData = SettingsQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: SettingsQueryVariables,
  options?: Omit<UseQueryOptions<SettingsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<SettingsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<SettingsQuery, TError, TData>({
    queryKey: variables === undefined ? ['settings'] : ['settings', variables],
    queryFn: fetcher<SettingsQuery, SettingsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      SettingsDocument,
      variables,
    ),
    ...options,
  });
};

export const AccountDocument = `
    query account($address: String!) {
  accountById(id: $address) {
    id
    type
    balance
    owned {
      id
      type
      balance
    }
  }
}
    `;

export const useAccountQuery = <TData = AccountQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: AccountQueryVariables,
  options?: Omit<UseQueryOptions<AccountQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<AccountQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<AccountQuery, TError, TData>({
    queryKey: ['account', variables],
    queryFn: fetcher<AccountQuery, AccountQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      AccountDocument,
      variables,
    ),
    ...options,
  });
};

export const AllWorkersDocument = `
    query allWorkers {
  workers(where: {status_eq: ACTIVE}, orderBy: totalDelegation_ASC) {
    ...WorkerFragment
  }
}
    ${WorkerFragmentFragmentDoc}`;

export const useAllWorkersQuery = <TData = AllWorkersQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: AllWorkersQueryVariables,
  options?: Omit<UseQueryOptions<AllWorkersQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<AllWorkersQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<AllWorkersQuery, TError, TData>({
    queryKey: variables === undefined ? ['allWorkers'] : ['allWorkers', variables],
    queryFn: fetcher<AllWorkersQuery, AllWorkersQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      AllWorkersDocument,
      variables,
    ),
    ...options,
  });
};

export const WorkerByPeerIdDocument = `
    query workerByPeerId($peerId: String!, $address: String) {
  workers(where: {peerId_eq: $peerId}, limit: 1) {
    ...WorkerFullFragment
    delegations(where: {realOwner: {id_eq: $address}, deposit_gt: 0}) {
      claimableReward
      claimedReward
      deposit
      locked
      owner {
        id
        type
      }
    }
  }
}
    ${WorkerFullFragmentFragmentDoc}`;

export const useWorkerByPeerIdQuery = <TData = WorkerByPeerIdQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: WorkerByPeerIdQueryVariables,
  options?: Omit<UseQueryOptions<WorkerByPeerIdQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<WorkerByPeerIdQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<WorkerByPeerIdQuery, TError, TData>({
    queryKey: ['workerByPeerId', variables],
    queryFn: fetcher<WorkerByPeerIdQuery, WorkerByPeerIdQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      WorkerByPeerIdDocument,
      variables,
    ),
    ...options,
  });
};

export const WorkerDaysUptimeByIdDocument = `
    query workerDaysUptimeById($id: String!, $from: DateTime!) {
  workerSnapshotsByDay(workerId: $id, from: $from) {
    timestamp
    uptime
  }
}
    `;

export const useWorkerDaysUptimeByIdQuery = <TData = WorkerDaysUptimeByIdQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: WorkerDaysUptimeByIdQueryVariables,
  options?: Omit<UseQueryOptions<WorkerDaysUptimeByIdQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<WorkerDaysUptimeByIdQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<WorkerDaysUptimeByIdQuery, TError, TData>({
    queryKey: ['workerDaysUptimeById', variables],
    queryFn: fetcher<WorkerDaysUptimeByIdQuery, WorkerDaysUptimeByIdQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      WorkerDaysUptimeByIdDocument,
      variables,
    ),
    ...options,
  });
};

export const MyWorkersDocument = `
    query myWorkers($address: String!) {
  workers(
    orderBy: id_ASC
    where: {realOwner: {id_eq: $address}, status_not_eq: WITHDRAWN}
  ) {
    ...WorkerFragment
    uptime24Hours
    claimableReward
    claimedReward
  }
}
    ${WorkerFragmentFragmentDoc}`;

export const useMyWorkersQuery = <TData = MyWorkersQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyWorkersQueryVariables,
  options?: Omit<UseQueryOptions<MyWorkersQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyWorkersQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyWorkersQuery, TError, TData>({
    queryKey: ['myWorkers', variables],
    queryFn: fetcher<MyWorkersQuery, MyWorkersQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyWorkersDocument,
      variables,
    ),
    ...options,
  });
};

export const MyWorkersCountDocument = `
    query myWorkersCount($address: String!) {
  workersConnection(orderBy: id_ASC, where: {realOwner: {id_eq: $address}}) {
    totalCount
  }
}
    `;

export const useMyWorkersCountQuery = <TData = MyWorkersCountQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyWorkersCountQueryVariables,
  options?: Omit<UseQueryOptions<MyWorkersCountQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyWorkersCountQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyWorkersCountQuery, TError, TData>({
    queryKey: ['myWorkersCount', variables],
    queryFn: fetcher<MyWorkersCountQuery, MyWorkersCountQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyWorkersCountDocument,
      variables,
    ),
    ...options,
  });
};

export const WorkerDelegationInfoDocument = `
    query workerDelegationInfo($workerId: String!) {
  workerById(id: $workerId) {
    bond
    totalDelegation
    capedDelegation
    liveness
    dTenure
    trafficWeight
  }
  statistics(limit: 1) {
    utilizedStake
    baseApr
  }
}
    `;

export const useWorkerDelegationInfoQuery = <TData = WorkerDelegationInfoQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: WorkerDelegationInfoQueryVariables,
  options?: Omit<UseQueryOptions<WorkerDelegationInfoQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<WorkerDelegationInfoQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<WorkerDelegationInfoQuery, TError, TData>({
    queryKey: ['workerDelegationInfo', variables],
    queryFn: fetcher<WorkerDelegationInfoQuery, WorkerDelegationInfoQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      WorkerDelegationInfoDocument,
      variables,
    ),
    ...options,
  });
};

export const WorkerOwnerDocument = `
    query workerOwner($workerId: String!) {
  workerById(id: $workerId) {
    owner {
      id
      type
    }
    realOwner {
      id
    }
  }
}
    `;

export const useWorkerOwnerQuery = <TData = WorkerOwnerQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: WorkerOwnerQueryVariables,
  options?: Omit<UseQueryOptions<WorkerOwnerQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<WorkerOwnerQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<WorkerOwnerQuery, TError, TData>({
    queryKey: ['workerOwner', variables],
    queryFn: fetcher<WorkerOwnerQuery, WorkerOwnerQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      WorkerOwnerDocument,
      variables,
    ),
    ...options,
  });
};

export const MyWorkerDelegationsDocument = `
    query myWorkerDelegations($address: String!, $workerId: String!) {
  workerById(id: $workerId) {
    delegations(where: {realOwner: {id_eq: $address}, deposit_gt: 0}) {
      claimableReward
      claimedReward
      deposit
      locked
      owner {
        id
        type
      }
    }
  }
}
    `;

export const useMyWorkerDelegationsQuery = <TData = MyWorkerDelegationsQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyWorkerDelegationsQueryVariables,
  options?: Omit<UseQueryOptions<MyWorkerDelegationsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyWorkerDelegationsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyWorkerDelegationsQuery, TError, TData>({
    queryKey: ['myWorkerDelegations', variables],
    queryFn: fetcher<MyWorkerDelegationsQuery, MyWorkerDelegationsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyWorkerDelegationsDocument,
      variables,
    ),
    ...options,
  });
};

export const MyAssetsDocument = `
    query myAssets($address: String!) {
  accounts(where: {id_eq: $address}) {
    balance
    owned {
      id
      balance
    }
  }
  workers(where: {realOwner: {id_eq: $address}}) {
    ...WorkerBaseFragment
    bond
    claimableReward
  }
  delegations(
    where: {realOwner: {id_eq: $address}, AND: {OR: [{deposit_gt: 0}, {claimableReward_gt: 0}]}}
  ) {
    claimableReward
    deposit
  }
}
    ${WorkerBaseFragmentFragmentDoc}`;

export const useMyAssetsQuery = <TData = MyAssetsQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyAssetsQueryVariables,
  options?: Omit<UseQueryOptions<MyAssetsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyAssetsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyAssetsQuery, TError, TData>({
    queryKey: ['myAssets', variables],
    queryFn: fetcher<MyAssetsQuery, MyAssetsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyAssetsDocument,
      variables,
    ),
    ...options,
  });
};

export const MyDelegationsDocument = `
    query myDelegations($address: String!) {
  delegations(where: {realOwner: {id_eq: $address}, deposit_gt: 0}) {
    claimableReward
    claimedReward
    deposit
    locked
    owner {
      id
      type
    }
    worker {
      ...WorkerFragment
      totalDelegation
      capedDelegation
    }
  }
}
    ${WorkerFragmentFragmentDoc}`;

export const useMyDelegationsQuery = <TData = MyDelegationsQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyDelegationsQueryVariables,
  options?: Omit<UseQueryOptions<MyDelegationsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyDelegationsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyDelegationsQuery, TError, TData>({
    queryKey: ['myDelegations', variables],
    queryFn: fetcher<MyDelegationsQuery, MyDelegationsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyDelegationsDocument,
      variables,
    ),
    ...options,
  });
};

export const MyClaimsDocument = `
    query myClaims($address: String!) {
  delegations(where: {realOwner: {id_eq: $address}, claimableReward_gt: 0}) {
    claimableReward
    deposit
    worker {
      ...WorkerBaseFragment
    }
    owner {
      id
      type
    }
  }
  workers(where: {realOwner: {id_eq: $address}, claimableReward_gt: 0}) {
    ...WorkerBaseFragment
    claimableReward
    owner {
      id
      type
    }
  }
}
    ${WorkerBaseFragmentFragmentDoc}`;

export const useMyClaimsQuery = <TData = MyClaimsQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyClaimsQueryVariables,
  options?: Omit<UseQueryOptions<MyClaimsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyClaimsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyClaimsQuery, TError, TData>({
    queryKey: ['myClaims', variables],
    queryFn: fetcher<MyClaimsQuery, MyClaimsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyClaimsDocument,
      variables,
    ),
    ...options,
  });
};

export const GatewayByPeerIdDocument = `
    query gatewayByPeerId($peerId: String!) {
  gatewayById(id: $peerId) {
    ...GatewayFragment
  }
}
    ${GatewayFragmentFragmentDoc}`;

export const useGatewayByPeerIdQuery = <TData = GatewayByPeerIdQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: GatewayByPeerIdQueryVariables,
  options?: Omit<UseQueryOptions<GatewayByPeerIdQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GatewayByPeerIdQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<GatewayByPeerIdQuery, TError, TData>({
    queryKey: ['gatewayByPeerId', variables],
    queryFn: fetcher<GatewayByPeerIdQuery, GatewayByPeerIdQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      GatewayByPeerIdDocument,
      variables,
    ),
    ...options,
  });
};

export const MyGatewaysDocument = `
    query myGateways($address: String!) {
  gateways(where: {realOwner: {id_eq: $address}, status_not_eq: DEREGISTERED}) {
    ...GatewayFragment
  }
}
    ${GatewayFragmentFragmentDoc}`;

export const useMyGatewaysQuery = <TData = MyGatewaysQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyGatewaysQueryVariables,
  options?: Omit<UseQueryOptions<MyGatewaysQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyGatewaysQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyGatewaysQuery, TError, TData>({
    queryKey: ['myGateways', variables],
    queryFn: fetcher<MyGatewaysQuery, MyGatewaysQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyGatewaysDocument,
      variables,
    ),
    ...options,
  });
};

export const MyGatewayStakesDocument = `
    query myGatewayStakes($address: String!) {
  gatewayStakes(where: {realOwner: {id_eq: $address}, amount_gt: "0"}) {
    ...GatewayStakeFragment
  }
  networkStats {
    blockTimeL1
    lastBlockL1
    lastBlockTimestampL1
  }
}
    ${GatewayStakeFragmentFragmentDoc}`;

export const useMyGatewayStakesQuery = <TData = MyGatewayStakesQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyGatewayStakesQueryVariables,
  options?: Omit<UseQueryOptions<MyGatewayStakesQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyGatewayStakesQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyGatewayStakesQuery, TError, TData>({
    queryKey: ['myGatewayStakes', variables],
    queryFn: fetcher<MyGatewayStakesQuery, MyGatewayStakesQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyGatewayStakesDocument,
      variables,
    ),
    ...options,
  });
};

export const VestingByAddressDocument = `
    query vestingByAddress($address: String!) {
  accountById(id: $address) {
    ...VestingFragment
  }
}
    ${VestingFragmentFragmentDoc}`;

export const useVestingByAddressQuery = <TData = VestingByAddressQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: VestingByAddressQueryVariables,
  options?: Omit<UseQueryOptions<VestingByAddressQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<VestingByAddressQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<VestingByAddressQuery, TError, TData>({
    queryKey: ['vestingByAddress', variables],
    queryFn: fetcher<VestingByAddressQuery, VestingByAddressQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      VestingByAddressDocument,
      variables,
    ),
    ...options,
  });
};

export const NetworkSummaryDocument = `
    query networkSummary {
  networkStats {
    onlineWorkersCount
    queries90Days
    queries24Hours
    servedData90Days
    servedData24Hours
    stakerApr
    totalBond
    totalDelegation
    storedData
    workerApr
    workersCount
    aprs {
      stakerApr
      timestamp
      workerApr
    }
  }
}
    `;

export const useNetworkSummaryQuery = <TData = NetworkSummaryQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: NetworkSummaryQueryVariables,
  options?: Omit<UseQueryOptions<NetworkSummaryQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<NetworkSummaryQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<NetworkSummaryQuery, TError, TData>({
    queryKey: variables === undefined ? ['networkSummary'] : ['networkSummary', variables],
    queryFn: fetcher<NetworkSummaryQuery, NetworkSummaryQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      NetworkSummaryDocument,
      variables,
    ),
    ...options,
  });
};

export const CurrentEpochDocument = `
    query currentEpoch {
  networkStats {
    blockTimeL1
    lastBlockL1
    lastBlockTimestampL1
  }
  epoches(limit: 1, orderBy: id_DESC) {
    number
    start
    end
  }
}
    `;

export const useCurrentEpochQuery = <TData = CurrentEpochQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: CurrentEpochQueryVariables,
  options?: Omit<UseQueryOptions<CurrentEpochQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<CurrentEpochQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<CurrentEpochQuery, TError, TData>({
    queryKey: variables === undefined ? ['currentEpoch'] : ['currentEpoch', variables],
    queryFn: fetcher<CurrentEpochQuery, CurrentEpochQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      CurrentEpochDocument,
      variables,
    ),
    ...options,
  });
};
