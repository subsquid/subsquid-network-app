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
  BigInt: { input: any; output: any };
  DateTime: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  balance: Scalars['BigInt']['output'];
  claimableDelegationCount: Scalars['Int']['output'];
  claims: Array<Claim>;
  delegations: Array<Delegation>;
  gatewayOperator?: Maybe<GatewayOperator>;
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
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ClaimableDelegationCountAsc = 'claimableDelegationCount_ASC',
  ClaimableDelegationCountAscNullsFirst = 'claimableDelegationCount_ASC_NULLS_FIRST',
  ClaimableDelegationCountDesc = 'claimableDelegationCount_DESC',
  ClaimableDelegationCountDescNullsLast = 'claimableDelegationCount_DESC_NULLS_LAST',
  GatewayOperatorAutoExtensionAsc = 'gatewayOperator_autoExtension_ASC',
  GatewayOperatorAutoExtensionAscNullsFirst = 'gatewayOperator_autoExtension_ASC_NULLS_FIRST',
  GatewayOperatorAutoExtensionDesc = 'gatewayOperator_autoExtension_DESC',
  GatewayOperatorAutoExtensionDescNullsLast = 'gatewayOperator_autoExtension_DESC_NULLS_LAST',
  GatewayOperatorIdAsc = 'gatewayOperator_id_ASC',
  GatewayOperatorIdAscNullsFirst = 'gatewayOperator_id_ASC_NULLS_FIRST',
  GatewayOperatorIdDesc = 'gatewayOperator_id_DESC',
  GatewayOperatorIdDescNullsLast = 'gatewayOperator_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
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
  AccountBalanceDesc = 'account_balance_DESC',
  AccountBalanceDescNullsLast = 'account_balance_DESC_NULLS_LAST',
  AccountClaimableDelegationCountAsc = 'account_claimableDelegationCount_ASC',
  AccountClaimableDelegationCountAscNullsFirst = 'account_claimableDelegationCount_ASC_NULLS_FIRST',
  AccountClaimableDelegationCountDesc = 'account_claimableDelegationCount_DESC',
  AccountClaimableDelegationCountDescNullsLast = 'account_claimableDelegationCount_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountTypeAsc = 'account_type_ASC',
  AccountTypeAscNullsFirst = 'account_type_ASC_NULLS_FIRST',
  AccountTypeDesc = 'account_type_DESC',
  AccountTypeDescNullsLast = 'account_type_DESC_NULLS_LAST',
  DirectionAsc = 'direction_ASC',
  DirectionAscNullsFirst = 'direction_ASC_NULLS_FIRST',
  DirectionDesc = 'direction_DESC',
  DirectionDescNullsLast = 'direction_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TransferAmountAsc = 'transfer_amount_ASC',
  TransferAmountAscNullsFirst = 'transfer_amount_ASC_NULLS_FIRST',
  TransferAmountDesc = 'transfer_amount_DESC',
  TransferAmountDescNullsLast = 'transfer_amount_DESC_NULLS_LAST',
  TransferBlockNumberAsc = 'transfer_blockNumber_ASC',
  TransferBlockNumberAscNullsFirst = 'transfer_blockNumber_ASC_NULLS_FIRST',
  TransferBlockNumberDesc = 'transfer_blockNumber_DESC',
  TransferBlockNumberDescNullsLast = 'transfer_blockNumber_DESC_NULLS_LAST',
  TransferIdAsc = 'transfer_id_ASC',
  TransferIdAscNullsFirst = 'transfer_id_ASC_NULLS_FIRST',
  TransferIdDesc = 'transfer_id_DESC',
  TransferIdDescNullsLast = 'transfer_id_DESC_NULLS_LAST',
  TransferTimestampAsc = 'transfer_timestamp_ASC',
  TransferTimestampAscNullsFirst = 'transfer_timestamp_ASC_NULLS_FIRST',
  TransferTimestampDesc = 'transfer_timestamp_DESC',
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
  gatewayOperator?: InputMaybe<GatewayOperatorWhereInput>;
  gatewayOperator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  HeightAsc = 'height_ASC',
  HeightAscNullsFirst = 'height_ASC_NULLS_FIRST',
  HeightDesc = 'height_DESC',
  HeightDescNullsLast = 'height_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  L1BlockNumberAsc = 'l1BlockNumber_ASC',
  L1BlockNumberAscNullsFirst = 'l1BlockNumber_ASC_NULLS_FIRST',
  L1BlockNumberDesc = 'l1BlockNumber_DESC',
  L1BlockNumberDescNullsLast = 'l1BlockNumber_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
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
  AccountBalanceDesc = 'account_balance_DESC',
  AccountBalanceDescNullsLast = 'account_balance_DESC_NULLS_LAST',
  AccountClaimableDelegationCountAsc = 'account_claimableDelegationCount_ASC',
  AccountClaimableDelegationCountAscNullsFirst = 'account_claimableDelegationCount_ASC_NULLS_FIRST',
  AccountClaimableDelegationCountDesc = 'account_claimableDelegationCount_DESC',
  AccountClaimableDelegationCountDescNullsLast = 'account_claimableDelegationCount_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountTypeAsc = 'account_type_ASC',
  AccountTypeAscNullsFirst = 'account_type_ASC_NULLS_FIRST',
  AccountTypeDesc = 'account_type_DESC',
  AccountTypeDescNullsLast = 'account_type_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DelegationClaimableRewardAsc = 'delegation_claimableReward_ASC',
  DelegationClaimableRewardAscNullsFirst = 'delegation_claimableReward_ASC_NULLS_FIRST',
  DelegationClaimableRewardDesc = 'delegation_claimableReward_DESC',
  DelegationClaimableRewardDescNullsLast = 'delegation_claimableReward_DESC_NULLS_LAST',
  DelegationClaimedRewardAsc = 'delegation_claimedReward_ASC',
  DelegationClaimedRewardAscNullsFirst = 'delegation_claimedReward_ASC_NULLS_FIRST',
  DelegationClaimedRewardDesc = 'delegation_claimedReward_DESC',
  DelegationClaimedRewardDescNullsLast = 'delegation_claimedReward_DESC_NULLS_LAST',
  DelegationDepositAsc = 'delegation_deposit_ASC',
  DelegationDepositAscNullsFirst = 'delegation_deposit_ASC_NULLS_FIRST',
  DelegationDepositDesc = 'delegation_deposit_DESC',
  DelegationDepositDescNullsLast = 'delegation_deposit_DESC_NULLS_LAST',
  DelegationIdAsc = 'delegation_id_ASC',
  DelegationIdAscNullsFirst = 'delegation_id_ASC_NULLS_FIRST',
  DelegationIdDesc = 'delegation_id_DESC',
  DelegationIdDescNullsLast = 'delegation_id_DESC_NULLS_LAST',
  DelegationLockEndAsc = 'delegation_lockEnd_ASC',
  DelegationLockEndAscNullsFirst = 'delegation_lockEnd_ASC_NULLS_FIRST',
  DelegationLockEndDesc = 'delegation_lockEnd_DESC',
  DelegationLockEndDescNullsLast = 'delegation_lockEnd_DESC_NULLS_LAST',
  DelegationLockStartAsc = 'delegation_lockStart_ASC',
  DelegationLockStartAscNullsFirst = 'delegation_lockStart_ASC_NULLS_FIRST',
  DelegationLockStartDesc = 'delegation_lockStart_DESC',
  DelegationLockStartDescNullsLast = 'delegation_lockStart_DESC_NULLS_LAST',
  DelegationLockedAsc = 'delegation_locked_ASC',
  DelegationLockedAscNullsFirst = 'delegation_locked_ASC_NULLS_FIRST',
  DelegationLockedDesc = 'delegation_locked_DESC',
  DelegationLockedDescNullsLast = 'delegation_locked_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteDesc = 'worker_website_DESC',
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
  from: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  recipients: Array<CommitmentRecipient>;
  to: Scalars['Int']['output'];
};

export type CommitmentEdge = {
  __typename?: 'CommitmentEdge';
  cursor: Scalars['String']['output'];
  node: Commitment;
};

export enum CommitmentOrderByInput {
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromDesc = 'from_DESC',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
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
  from_eq?: InputMaybe<Scalars['Int']['input']>;
  from_gt?: InputMaybe<Scalars['Int']['input']>;
  from_gte?: InputMaybe<Scalars['Int']['input']>;
  from_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['Int']['input']>;
  from_lte?: InputMaybe<Scalars['Int']['input']>;
  from_not_eq?: InputMaybe<Scalars['Int']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  to_eq?: InputMaybe<Scalars['Int']['input']>;
  to_gt?: InputMaybe<Scalars['Int']['input']>;
  to_gte?: InputMaybe<Scalars['Int']['input']>;
  to_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['Int']['input']>;
  to_lte?: InputMaybe<Scalars['Int']['input']>;
  to_not_eq?: InputMaybe<Scalars['Int']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  ClaimableRewardDesc = 'claimableReward_DESC',
  ClaimableRewardDescNullsLast = 'claimableReward_DESC_NULLS_LAST',
  ClaimedRewardAsc = 'claimedReward_ASC',
  ClaimedRewardAscNullsFirst = 'claimedReward_ASC_NULLS_FIRST',
  ClaimedRewardDesc = 'claimedReward_DESC',
  ClaimedRewardDescNullsLast = 'claimedReward_DESC_NULLS_LAST',
  DepositAsc = 'deposit_ASC',
  DepositAscNullsFirst = 'deposit_ASC_NULLS_FIRST',
  DepositDesc = 'deposit_DESC',
  DepositDescNullsLast = 'deposit_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteDesc = 'worker_website_DESC',
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
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DelegationClaimableRewardAsc = 'delegation_claimableReward_ASC',
  DelegationClaimableRewardAscNullsFirst = 'delegation_claimableReward_ASC_NULLS_FIRST',
  DelegationClaimableRewardDesc = 'delegation_claimableReward_DESC',
  DelegationClaimableRewardDescNullsLast = 'delegation_claimableReward_DESC_NULLS_LAST',
  DelegationClaimedRewardAsc = 'delegation_claimedReward_ASC',
  DelegationClaimedRewardAscNullsFirst = 'delegation_claimedReward_ASC_NULLS_FIRST',
  DelegationClaimedRewardDesc = 'delegation_claimedReward_DESC',
  DelegationClaimedRewardDescNullsLast = 'delegation_claimedReward_DESC_NULLS_LAST',
  DelegationDepositAsc = 'delegation_deposit_ASC',
  DelegationDepositAscNullsFirst = 'delegation_deposit_ASC_NULLS_FIRST',
  DelegationDepositDesc = 'delegation_deposit_DESC',
  DelegationDepositDescNullsLast = 'delegation_deposit_DESC_NULLS_LAST',
  DelegationIdAsc = 'delegation_id_ASC',
  DelegationIdAscNullsFirst = 'delegation_id_ASC_NULLS_FIRST',
  DelegationIdDesc = 'delegation_id_DESC',
  DelegationIdDescNullsLast = 'delegation_id_DESC_NULLS_LAST',
  DelegationLockEndAsc = 'delegation_lockEnd_ASC',
  DelegationLockEndAscNullsFirst = 'delegation_lockEnd_ASC_NULLS_FIRST',
  DelegationLockEndDesc = 'delegation_lockEnd_DESC',
  DelegationLockEndDescNullsLast = 'delegation_lockEnd_DESC_NULLS_LAST',
  DelegationLockStartAsc = 'delegation_lockStart_ASC',
  DelegationLockStartAscNullsFirst = 'delegation_lockStart_ASC_NULLS_FIRST',
  DelegationLockStartDesc = 'delegation_lockStart_DESC',
  DelegationLockStartDescNullsLast = 'delegation_lockStart_DESC_NULLS_LAST',
  DelegationLockedAsc = 'delegation_locked_ASC',
  DelegationLockedAscNullsFirst = 'delegation_locked_ASC_NULLS_FIRST',
  DelegationLockedDesc = 'delegation_locked_DESC',
  DelegationLockedDescNullsLast = 'delegation_locked_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
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
  EndDesc = 'end_DESC',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  EndedAtAsc = 'endedAt_ASC',
  EndedAtAscNullsFirst = 'endedAt_ASC_NULLS_FIRST',
  EndedAtDesc = 'endedAt_DESC',
  EndedAtDescNullsLast = 'endedAt_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NumberAsc = 'number_ASC',
  NumberAscNullsFirst = 'number_ASC_NULLS_FIRST',
  NumberDesc = 'number_DESC',
  NumberDescNullsLast = 'number_DESC_NULLS_LAST',
  StartAsc = 'start_ASC',
  StartAscNullsFirst = 'start_ASC_NULLS_FIRST',
  StartDesc = 'start_DESC',
  StartDescNullsLast = 'start_DESC_NULLS_LAST',
  StartedAtAsc = 'startedAt_ASC',
  StartedAtAscNullsFirst = 'startedAt_ASC_NULLS_FIRST',
  StartedAtDesc = 'startedAt_DESC',
  StartedAtDescNullsLast = 'startedAt_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
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
  operator?: Maybe<GatewayOperator>;
  owner?: Maybe<Account>;
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

export type GatewayOperator = {
  __typename?: 'GatewayOperator';
  account: Account;
  autoExtension: Scalars['Boolean']['output'];
  gateways: Array<Gateway>;
  id: Scalars['String']['output'];
  pendingStake?: Maybe<GatewayStake>;
  stake?: Maybe<GatewayStake>;
};

export type GatewayOperatorGatewaysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayOrderByInput>>;
  where?: InputMaybe<GatewayWhereInput>;
};

export type GatewayOperatorEdge = {
  __typename?: 'GatewayOperatorEdge';
  cursor: Scalars['String']['output'];
  node: GatewayOperator;
};

export enum GatewayOperatorOrderByInput {
  AccountBalanceAsc = 'account_balance_ASC',
  AccountBalanceAscNullsFirst = 'account_balance_ASC_NULLS_FIRST',
  AccountBalanceDesc = 'account_balance_DESC',
  AccountBalanceDescNullsLast = 'account_balance_DESC_NULLS_LAST',
  AccountClaimableDelegationCountAsc = 'account_claimableDelegationCount_ASC',
  AccountClaimableDelegationCountAscNullsFirst = 'account_claimableDelegationCount_ASC_NULLS_FIRST',
  AccountClaimableDelegationCountDesc = 'account_claimableDelegationCount_DESC',
  AccountClaimableDelegationCountDescNullsLast = 'account_claimableDelegationCount_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountTypeAsc = 'account_type_ASC',
  AccountTypeAscNullsFirst = 'account_type_ASC_NULLS_FIRST',
  AccountTypeDesc = 'account_type_DESC',
  AccountTypeDescNullsLast = 'account_type_DESC_NULLS_LAST',
  AutoExtensionAsc = 'autoExtension_ASC',
  AutoExtensionAscNullsFirst = 'autoExtension_ASC_NULLS_FIRST',
  AutoExtensionDesc = 'autoExtension_DESC',
  AutoExtensionDescNullsLast = 'autoExtension_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PendingStakeAmountAsc = 'pendingStake_amount_ASC',
  PendingStakeAmountAscNullsFirst = 'pendingStake_amount_ASC_NULLS_FIRST',
  PendingStakeAmountDesc = 'pendingStake_amount_DESC',
  PendingStakeAmountDescNullsLast = 'pendingStake_amount_DESC_NULLS_LAST',
  PendingStakeComputationUnitsAsc = 'pendingStake_computationUnits_ASC',
  PendingStakeComputationUnitsAscNullsFirst = 'pendingStake_computationUnits_ASC_NULLS_FIRST',
  PendingStakeComputationUnitsDesc = 'pendingStake_computationUnits_DESC',
  PendingStakeComputationUnitsDescNullsLast = 'pendingStake_computationUnits_DESC_NULLS_LAST',
  PendingStakeIdAsc = 'pendingStake_id_ASC',
  PendingStakeIdAscNullsFirst = 'pendingStake_id_ASC_NULLS_FIRST',
  PendingStakeIdDesc = 'pendingStake_id_DESC',
  PendingStakeIdDescNullsLast = 'pendingStake_id_DESC_NULLS_LAST',
  PendingStakeIndexAsc = 'pendingStake_index_ASC',
  PendingStakeIndexAscNullsFirst = 'pendingStake_index_ASC_NULLS_FIRST',
  PendingStakeIndexDesc = 'pendingStake_index_DESC',
  PendingStakeIndexDescNullsLast = 'pendingStake_index_DESC_NULLS_LAST',
  PendingStakeLockEndAsc = 'pendingStake_lockEnd_ASC',
  PendingStakeLockEndAscNullsFirst = 'pendingStake_lockEnd_ASC_NULLS_FIRST',
  PendingStakeLockEndDesc = 'pendingStake_lockEnd_DESC',
  PendingStakeLockEndDescNullsLast = 'pendingStake_lockEnd_DESC_NULLS_LAST',
  PendingStakeLockStartAsc = 'pendingStake_lockStart_ASC',
  PendingStakeLockStartAscNullsFirst = 'pendingStake_lockStart_ASC_NULLS_FIRST',
  PendingStakeLockStartDesc = 'pendingStake_lockStart_DESC',
  PendingStakeLockStartDescNullsLast = 'pendingStake_lockStart_DESC_NULLS_LAST',
  PendingStakeLockedAsc = 'pendingStake_locked_ASC',
  PendingStakeLockedAscNullsFirst = 'pendingStake_locked_ASC_NULLS_FIRST',
  PendingStakeLockedDesc = 'pendingStake_locked_DESC',
  PendingStakeLockedDescNullsLast = 'pendingStake_locked_DESC_NULLS_LAST',
  StakeAmountAsc = 'stake_amount_ASC',
  StakeAmountAscNullsFirst = 'stake_amount_ASC_NULLS_FIRST',
  StakeAmountDesc = 'stake_amount_DESC',
  StakeAmountDescNullsLast = 'stake_amount_DESC_NULLS_LAST',
  StakeComputationUnitsAsc = 'stake_computationUnits_ASC',
  StakeComputationUnitsAscNullsFirst = 'stake_computationUnits_ASC_NULLS_FIRST',
  StakeComputationUnitsDesc = 'stake_computationUnits_DESC',
  StakeComputationUnitsDescNullsLast = 'stake_computationUnits_DESC_NULLS_LAST',
  StakeIdAsc = 'stake_id_ASC',
  StakeIdAscNullsFirst = 'stake_id_ASC_NULLS_FIRST',
  StakeIdDesc = 'stake_id_DESC',
  StakeIdDescNullsLast = 'stake_id_DESC_NULLS_LAST',
  StakeIndexAsc = 'stake_index_ASC',
  StakeIndexAscNullsFirst = 'stake_index_ASC_NULLS_FIRST',
  StakeIndexDesc = 'stake_index_DESC',
  StakeIndexDescNullsLast = 'stake_index_DESC_NULLS_LAST',
  StakeLockEndAsc = 'stake_lockEnd_ASC',
  StakeLockEndAscNullsFirst = 'stake_lockEnd_ASC_NULLS_FIRST',
  StakeLockEndDesc = 'stake_lockEnd_DESC',
  StakeLockEndDescNullsLast = 'stake_lockEnd_DESC_NULLS_LAST',
  StakeLockStartAsc = 'stake_lockStart_ASC',
  StakeLockStartAscNullsFirst = 'stake_lockStart_ASC_NULLS_FIRST',
  StakeLockStartDesc = 'stake_lockStart_DESC',
  StakeLockStartDescNullsLast = 'stake_lockStart_DESC_NULLS_LAST',
  StakeLockedAsc = 'stake_locked_ASC',
  StakeLockedAscNullsFirst = 'stake_locked_ASC_NULLS_FIRST',
  StakeLockedDesc = 'stake_locked_DESC',
  StakeLockedDescNullsLast = 'stake_locked_DESC_NULLS_LAST',
}

export type GatewayOperatorWhereInput = {
  AND?: InputMaybe<Array<GatewayOperatorWhereInput>>;
  OR?: InputMaybe<Array<GatewayOperatorWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  autoExtension_eq?: InputMaybe<Scalars['Boolean']['input']>;
  autoExtension_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  autoExtension_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
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
  pendingStake?: InputMaybe<GatewayStakeWhereInput>;
  pendingStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stake?: InputMaybe<GatewayStakeWhereInput>;
  stake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GatewayOperatorsConnection = {
  __typename?: 'GatewayOperatorsConnection';
  edges: Array<GatewayOperatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum GatewayOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EmailAsc = 'email_ASC',
  EmailAscNullsFirst = 'email_ASC_NULLS_FIRST',
  EmailDesc = 'email_DESC',
  EmailDescNullsLast = 'email_DESC_NULLS_LAST',
  EndpointUrlAsc = 'endpointUrl_ASC',
  EndpointUrlAscNullsFirst = 'endpointUrl_ASC_NULLS_FIRST',
  EndpointUrlDesc = 'endpointUrl_DESC',
  EndpointUrlDescNullsLast = 'endpointUrl_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  OperatorAutoExtensionAsc = 'operator_autoExtension_ASC',
  OperatorAutoExtensionAscNullsFirst = 'operator_autoExtension_ASC_NULLS_FIRST',
  OperatorAutoExtensionDesc = 'operator_autoExtension_DESC',
  OperatorAutoExtensionDescNullsLast = 'operator_autoExtension_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  WebsiteAsc = 'website_ASC',
  WebsiteAscNullsFirst = 'website_ASC_NULLS_FIRST',
  WebsiteDesc = 'website_DESC',
  WebsiteDescNullsLast = 'website_DESC_NULLS_LAST',
}

export type GatewayStake = {
  __typename?: 'GatewayStake';
  amount: Scalars['BigInt']['output'];
  computationUnits: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  lockEnd: Scalars['Int']['output'];
  lockStart: Scalars['Int']['output'];
  locked: Scalars['Boolean']['output'];
  operator: GatewayOperator;
  owner: Account;
};

export type GatewayStakeEdge = {
  __typename?: 'GatewayStakeEdge';
  cursor: Scalars['String']['output'];
  node: GatewayStake;
};

export enum GatewayStakeOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  ComputationUnitsAsc = 'computationUnits_ASC',
  ComputationUnitsAscNullsFirst = 'computationUnits_ASC_NULLS_FIRST',
  ComputationUnitsDesc = 'computationUnits_DESC',
  ComputationUnitsDescNullsLast = 'computationUnits_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  OperatorAutoExtensionAsc = 'operator_autoExtension_ASC',
  OperatorAutoExtensionAscNullsFirst = 'operator_autoExtension_ASC_NULLS_FIRST',
  OperatorAutoExtensionDesc = 'operator_autoExtension_DESC',
  OperatorAutoExtensionDescNullsLast = 'operator_autoExtension_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
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
  computationUnits_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  computationUnits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  computationUnits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  computationUnits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operator?: InputMaybe<GatewayOperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  GatewayCreatedAtAsc = 'gateway_createdAt_ASC',
  GatewayCreatedAtAscNullsFirst = 'gateway_createdAt_ASC_NULLS_FIRST',
  GatewayCreatedAtDesc = 'gateway_createdAt_DESC',
  GatewayCreatedAtDescNullsLast = 'gateway_createdAt_DESC_NULLS_LAST',
  GatewayDescriptionAsc = 'gateway_description_ASC',
  GatewayDescriptionAscNullsFirst = 'gateway_description_ASC_NULLS_FIRST',
  GatewayDescriptionDesc = 'gateway_description_DESC',
  GatewayDescriptionDescNullsLast = 'gateway_description_DESC_NULLS_LAST',
  GatewayEmailAsc = 'gateway_email_ASC',
  GatewayEmailAscNullsFirst = 'gateway_email_ASC_NULLS_FIRST',
  GatewayEmailDesc = 'gateway_email_DESC',
  GatewayEmailDescNullsLast = 'gateway_email_DESC_NULLS_LAST',
  GatewayEndpointUrlAsc = 'gateway_endpointUrl_ASC',
  GatewayEndpointUrlAscNullsFirst = 'gateway_endpointUrl_ASC_NULLS_FIRST',
  GatewayEndpointUrlDesc = 'gateway_endpointUrl_DESC',
  GatewayEndpointUrlDescNullsLast = 'gateway_endpointUrl_DESC_NULLS_LAST',
  GatewayIdAsc = 'gateway_id_ASC',
  GatewayIdAscNullsFirst = 'gateway_id_ASC_NULLS_FIRST',
  GatewayIdDesc = 'gateway_id_DESC',
  GatewayIdDescNullsLast = 'gateway_id_DESC_NULLS_LAST',
  GatewayNameAsc = 'gateway_name_ASC',
  GatewayNameAscNullsFirst = 'gateway_name_ASC_NULLS_FIRST',
  GatewayNameDesc = 'gateway_name_DESC',
  GatewayNameDescNullsLast = 'gateway_name_DESC_NULLS_LAST',
  GatewayStatusAsc = 'gateway_status_ASC',
  GatewayStatusAscNullsFirst = 'gateway_status_ASC_NULLS_FIRST',
  GatewayStatusDesc = 'gateway_status_DESC',
  GatewayStatusDescNullsLast = 'gateway_status_DESC_NULLS_LAST',
  GatewayWebsiteAsc = 'gateway_website_ASC',
  GatewayWebsiteAscNullsFirst = 'gateway_website_ASC_NULLS_FIRST',
  GatewayWebsiteDesc = 'gateway_website_DESC',
  GatewayWebsiteDescNullsLast = 'gateway_website_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
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
  operator?: InputMaybe<GatewayOperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<AccountWhereInput>;
  owner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** @deprecated Use accountById */
  accountByUniqueInput?: Maybe<Account>;
  accountTransferById?: Maybe<AccountTransfer>;
  /** @deprecated Use accountTransferById */
  accountTransferByUniqueInput?: Maybe<AccountTransfer>;
  accountTransfers: Array<AccountTransfer>;
  accountTransfersConnection: AccountTransfersConnection;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  blockById?: Maybe<Block>;
  /** @deprecated Use blockById */
  blockByUniqueInput?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  claimById?: Maybe<Claim>;
  /** @deprecated Use claimById */
  claimByUniqueInput?: Maybe<Claim>;
  claims: Array<Claim>;
  claimsConnection: ClaimsConnection;
  commitmentById?: Maybe<Commitment>;
  /** @deprecated Use commitmentById */
  commitmentByUniqueInput?: Maybe<Commitment>;
  commitments: Array<Commitment>;
  commitmentsConnection: CommitmentsConnection;
  delegationById?: Maybe<Delegation>;
  /** @deprecated Use delegationById */
  delegationByUniqueInput?: Maybe<Delegation>;
  delegationRewardById?: Maybe<DelegationReward>;
  /** @deprecated Use delegationRewardById */
  delegationRewardByUniqueInput?: Maybe<DelegationReward>;
  delegationRewards: Array<DelegationReward>;
  delegationRewardsConnection: DelegationRewardsConnection;
  delegations: Array<Delegation>;
  delegationsConnection: DelegationsConnection;
  epochById?: Maybe<Epoch>;
  /** @deprecated Use epochById */
  epochByUniqueInput?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  epochesConnection: EpochesConnection;
  gatewayById?: Maybe<Gateway>;
  /** @deprecated Use gatewayById */
  gatewayByUniqueInput?: Maybe<Gateway>;
  gatewayOperatorById?: Maybe<GatewayOperator>;
  /** @deprecated Use gatewayOperatorById */
  gatewayOperatorByUniqueInput?: Maybe<GatewayOperator>;
  gatewayOperators: Array<GatewayOperator>;
  gatewayOperatorsConnection: GatewayOperatorsConnection;
  gatewayStakeById?: Maybe<GatewayStake>;
  /** @deprecated Use gatewayStakeById */
  gatewayStakeByUniqueInput?: Maybe<GatewayStake>;
  gatewayStakes: Array<GatewayStake>;
  gatewayStakesConnection: GatewayStakesConnection;
  gatewayStatusChangeById?: Maybe<GatewayStatusChange>;
  /** @deprecated Use gatewayStatusChangeById */
  gatewayStatusChangeByUniqueInput?: Maybe<GatewayStatusChange>;
  gatewayStatusChanges: Array<GatewayStatusChange>;
  gatewayStatusChangesConnection: GatewayStatusChangesConnection;
  gateways: Array<Gateway>;
  gatewaysConnection: GatewaysConnection;
  settings: Array<Settings>;
  settingsById?: Maybe<Settings>;
  /** @deprecated Use settingsById */
  settingsByUniqueInput?: Maybe<Settings>;
  settingsConnection: SettingsConnection;
  squidStatus: SquidStatus;
  statistics: Array<Statistics>;
  statisticsById?: Maybe<Statistics>;
  /** @deprecated Use statisticsById */
  statisticsByUniqueInput?: Maybe<Statistics>;
  statisticsConnection: StatisticsConnection;
  transferById?: Maybe<Transfer>;
  /** @deprecated Use transferById */
  transferByUniqueInput?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
  workerById?: Maybe<Worker>;
  /** @deprecated Use workerById */
  workerByUniqueInput?: Maybe<Worker>;
  workerRewardById?: Maybe<WorkerReward>;
  /** @deprecated Use workerRewardById */
  workerRewardByUniqueInput?: Maybe<WorkerReward>;
  workerRewards: Array<WorkerReward>;
  workerRewardsConnection: WorkerRewardsConnection;
  workerSnapshotById?: Maybe<WorkerSnapshot>;
  /** @deprecated Use workerSnapshotById */
  workerSnapshotByUniqueInput?: Maybe<WorkerSnapshot>;
  workerSnapshots: Array<WorkerSnapshot>;
  workerSnapshotsByDay: Array<WorkerSnapshotDay>;
  workerSnapshotsConnection: WorkerSnapshotsConnection;
  workerStatusChangeById?: Maybe<WorkerStatusChange>;
  /** @deprecated Use workerStatusChangeById */
  workerStatusChangeByUniqueInput?: Maybe<WorkerStatusChange>;
  workerStatusChanges: Array<WorkerStatusChange>;
  workerStatusChangesConnection: WorkerStatusChangesConnection;
  workers: Array<Worker>;
  workersConnection: WorkersConnection;
};

export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryAccountTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountTransferByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryBlockByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryClaimByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryCommitmentByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryDelegationByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryDelegationRewardByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryDelegationRewardByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryEpochByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryGatewayByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryGatewayOperatorByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGatewayOperatorByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryGatewayOperatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GatewayOperatorOrderByInput>>;
  where?: InputMaybe<GatewayOperatorWhereInput>;
};

export type QueryGatewayOperatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GatewayOperatorOrderByInput>;
  where?: InputMaybe<GatewayOperatorWhereInput>;
};

export type QueryGatewayStakeByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGatewayStakeByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryGatewayStatusChangeByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QuerySettingsByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryStatisticsByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryTransferByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryWorkerByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryWorkerRewardByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWorkerRewardByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryWorkerSnapshotByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryWorkerStatusChangeByUniqueInputArgs = {
  where: WhereIdInput;
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
  BondAmountDesc = 'bondAmount_DESC',
  BondAmountDescNullsLast = 'bondAmount_DESC_NULLS_LAST',
  DelegationLimitCoefficientAsc = 'delegationLimitCoefficient_ASC',
  DelegationLimitCoefficientAscNullsFirst = 'delegationLimitCoefficient_ASC_NULLS_FIRST',
  DelegationLimitCoefficientDesc = 'delegationLimitCoefficient_DESC',
  DelegationLimitCoefficientDescNullsLast = 'delegationLimitCoefficient_DESC_NULLS_LAST',
  EpochLengthAsc = 'epochLength_ASC',
  EpochLengthAscNullsFirst = 'epochLength_ASC_NULLS_FIRST',
  EpochLengthDesc = 'epochLength_DESC',
  EpochLengthDescNullsLast = 'epochLength_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
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
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  finalizedHeight: Scalars['Float']['output'];
  height: Scalars['Float']['output'];
};

export type Statistics = {
  __typename?: 'Statistics';
  blockTime: Scalars['Int']['output'];
  blockTimeL1: Scalars['Int']['output'];
  currentEpoch?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  lastBlock: Scalars['Int']['output'];
  lastBlockL1: Scalars['Int']['output'];
  lastBlockTimestamp: Scalars['DateTime']['output'];
  lastBlockTimestampL1: Scalars['DateTime']['output'];
  lastSnapshotTimestamp: Scalars['DateTime']['output'];
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
  BlockTimeL1Asc = 'blockTimeL1_ASC',
  BlockTimeL1AscNullsFirst = 'blockTimeL1_ASC_NULLS_FIRST',
  BlockTimeL1Desc = 'blockTimeL1_DESC',
  BlockTimeL1DescNullsLast = 'blockTimeL1_DESC_NULLS_LAST',
  BlockTimeAsc = 'blockTime_ASC',
  BlockTimeAscNullsFirst = 'blockTime_ASC_NULLS_FIRST',
  BlockTimeDesc = 'blockTime_DESC',
  BlockTimeDescNullsLast = 'blockTime_DESC_NULLS_LAST',
  CurrentEpochAsc = 'currentEpoch_ASC',
  CurrentEpochAscNullsFirst = 'currentEpoch_ASC_NULLS_FIRST',
  CurrentEpochDesc = 'currentEpoch_DESC',
  CurrentEpochDescNullsLast = 'currentEpoch_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastBlockL1Asc = 'lastBlockL1_ASC',
  LastBlockL1AscNullsFirst = 'lastBlockL1_ASC_NULLS_FIRST',
  LastBlockL1Desc = 'lastBlockL1_DESC',
  LastBlockL1DescNullsLast = 'lastBlockL1_DESC_NULLS_LAST',
  LastBlockTimestampL1Asc = 'lastBlockTimestampL1_ASC',
  LastBlockTimestampL1AscNullsFirst = 'lastBlockTimestampL1_ASC_NULLS_FIRST',
  LastBlockTimestampL1Desc = 'lastBlockTimestampL1_DESC',
  LastBlockTimestampL1DescNullsLast = 'lastBlockTimestampL1_DESC_NULLS_LAST',
  LastBlockTimestampAsc = 'lastBlockTimestamp_ASC',
  LastBlockTimestampAscNullsFirst = 'lastBlockTimestamp_ASC_NULLS_FIRST',
  LastBlockTimestampDesc = 'lastBlockTimestamp_DESC',
  LastBlockTimestampDescNullsLast = 'lastBlockTimestamp_DESC_NULLS_LAST',
  LastBlockAsc = 'lastBlock_ASC',
  LastBlockAscNullsFirst = 'lastBlock_ASC_NULLS_FIRST',
  LastBlockDesc = 'lastBlock_DESC',
  LastBlockDescNullsLast = 'lastBlock_DESC_NULLS_LAST',
  LastSnapshotTimestampAsc = 'lastSnapshotTimestamp_ASC',
  LastSnapshotTimestampAscNullsFirst = 'lastSnapshotTimestamp_ASC_NULLS_FIRST',
  LastSnapshotTimestampDesc = 'lastSnapshotTimestamp_DESC',
  LastSnapshotTimestampDescNullsLast = 'lastSnapshotTimestamp_DESC_NULLS_LAST',
}

export type StatisticsWhereInput = {
  AND?: InputMaybe<Array<StatisticsWhereInput>>;
  OR?: InputMaybe<Array<StatisticsWhereInput>>;
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
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FromBalanceAsc = 'from_balance_ASC',
  FromBalanceAscNullsFirst = 'from_balance_ASC_NULLS_FIRST',
  FromBalanceDesc = 'from_balance_DESC',
  FromBalanceDescNullsLast = 'from_balance_DESC_NULLS_LAST',
  FromClaimableDelegationCountAsc = 'from_claimableDelegationCount_ASC',
  FromClaimableDelegationCountAscNullsFirst = 'from_claimableDelegationCount_ASC_NULLS_FIRST',
  FromClaimableDelegationCountDesc = 'from_claimableDelegationCount_DESC',
  FromClaimableDelegationCountDescNullsLast = 'from_claimableDelegationCount_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromTypeAsc = 'from_type_ASC',
  FromTypeAscNullsFirst = 'from_type_ASC_NULLS_FIRST',
  FromTypeDesc = 'from_type_DESC',
  FromTypeDescNullsLast = 'from_type_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToBalanceAsc = 'to_balance_ASC',
  ToBalanceAscNullsFirst = 'to_balance_ASC_NULLS_FIRST',
  ToBalanceDesc = 'to_balance_DESC',
  ToBalanceDescNullsLast = 'to_balance_DESC_NULLS_LAST',
  ToClaimableDelegationCountAsc = 'to_claimableDelegationCount_ASC',
  ToClaimableDelegationCountAscNullsFirst = 'to_claimableDelegationCount_ASC_NULLS_FIRST',
  ToClaimableDelegationCountDesc = 'to_claimableDelegationCount_DESC',
  ToClaimableDelegationCountDescNullsLast = 'to_claimableDelegationCount_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToTypeAsc = 'to_type_ASC',
  ToTypeAscNullsFirst = 'to_type_ASC_NULLS_FIRST',
  ToTypeDesc = 'to_type_DESC',
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

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type Worker = {
  __typename?: 'Worker';
  apr?: Maybe<Scalars['Float']['output']>;
  bond: Scalars['BigInt']['output'];
  claimableReward: Scalars['BigInt']['output'];
  claimedReward: Scalars['BigInt']['output'];
  claims: Array<Claim>;
  createdAt: Scalars['DateTime']['output'];
  delegationCount: Scalars['Int']['output'];
  delegations: Array<Delegation>;
  description?: Maybe<Scalars['String']['output']>;
  dialOk?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jailed?: Maybe<Scalars['Boolean']['output']>;
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

export type WorkerEdge = {
  __typename?: 'WorkerEdge';
  cursor: Scalars['String']['output'];
  node: Worker;
};

export enum WorkerOrderByInput {
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprDesc = 'apr_DESC',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  BondAsc = 'bond_ASC',
  BondAscNullsFirst = 'bond_ASC_NULLS_FIRST',
  BondDesc = 'bond_DESC',
  BondDescNullsLast = 'bond_DESC_NULLS_LAST',
  ClaimableRewardAsc = 'claimableReward_ASC',
  ClaimableRewardAscNullsFirst = 'claimableReward_ASC_NULLS_FIRST',
  ClaimableRewardDesc = 'claimableReward_DESC',
  ClaimableRewardDescNullsLast = 'claimableReward_DESC_NULLS_LAST',
  ClaimedRewardAsc = 'claimedReward_ASC',
  ClaimedRewardAscNullsFirst = 'claimedReward_ASC_NULLS_FIRST',
  ClaimedRewardDesc = 'claimedReward_DESC',
  ClaimedRewardDescNullsLast = 'claimedReward_DESC_NULLS_LAST',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  DelegationCountAsc = 'delegationCount_ASC',
  DelegationCountAscNullsFirst = 'delegationCount_ASC_NULLS_FIRST',
  DelegationCountDesc = 'delegationCount_DESC',
  DelegationCountDescNullsLast = 'delegationCount_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  DialOkAsc = 'dialOk_ASC',
  DialOkAscNullsFirst = 'dialOk_ASC_NULLS_FIRST',
  DialOkDesc = 'dialOk_DESC',
  DialOkDescNullsLast = 'dialOk_DESC_NULLS_LAST',
  EmailAsc = 'email_ASC',
  EmailAscNullsFirst = 'email_ASC_NULLS_FIRST',
  EmailDesc = 'email_DESC',
  EmailDescNullsLast = 'email_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  JailedAsc = 'jailed_ASC',
  JailedAscNullsFirst = 'jailed_ASC_NULLS_FIRST',
  JailedDesc = 'jailed_DESC',
  JailedDescNullsLast = 'jailed_DESC_NULLS_LAST',
  LockEndAsc = 'lockEnd_ASC',
  LockEndAscNullsFirst = 'lockEnd_ASC_NULLS_FIRST',
  LockEndDesc = 'lockEnd_DESC',
  LockEndDescNullsLast = 'lockEnd_DESC_NULLS_LAST',
  LockStartAsc = 'lockStart_ASC',
  LockStartAscNullsFirst = 'lockStart_ASC_NULLS_FIRST',
  LockStartDesc = 'lockStart_DESC',
  LockStartDescNullsLast = 'lockStart_DESC_NULLS_LAST',
  LockedAsc = 'locked_ASC',
  LockedAscNullsFirst = 'locked_ASC_NULLS_FIRST',
  LockedDesc = 'locked_DESC',
  LockedDescNullsLast = 'locked_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  OnlineAsc = 'online_ASC',
  OnlineAscNullsFirst = 'online_ASC_NULLS_FIRST',
  OnlineDesc = 'online_DESC',
  OnlineDescNullsLast = 'online_DESC_NULLS_LAST',
  OwnerBalanceAsc = 'owner_balance_ASC',
  OwnerBalanceAscNullsFirst = 'owner_balance_ASC_NULLS_FIRST',
  OwnerBalanceDesc = 'owner_balance_DESC',
  OwnerBalanceDescNullsLast = 'owner_balance_DESC_NULLS_LAST',
  OwnerClaimableDelegationCountAsc = 'owner_claimableDelegationCount_ASC',
  OwnerClaimableDelegationCountAscNullsFirst = 'owner_claimableDelegationCount_ASC_NULLS_FIRST',
  OwnerClaimableDelegationCountDesc = 'owner_claimableDelegationCount_DESC',
  OwnerClaimableDelegationCountDescNullsLast = 'owner_claimableDelegationCount_DESC_NULLS_LAST',
  OwnerIdAsc = 'owner_id_ASC',
  OwnerIdAscNullsFirst = 'owner_id_ASC_NULLS_FIRST',
  OwnerIdDesc = 'owner_id_DESC',
  OwnerIdDescNullsLast = 'owner_id_DESC_NULLS_LAST',
  OwnerTypeAsc = 'owner_type_ASC',
  OwnerTypeAscNullsFirst = 'owner_type_ASC_NULLS_FIRST',
  OwnerTypeDesc = 'owner_type_DESC',
  OwnerTypeDescNullsLast = 'owner_type_DESC_NULLS_LAST',
  PeerIdAsc = 'peerId_ASC',
  PeerIdAscNullsFirst = 'peerId_ASC_NULLS_FIRST',
  PeerIdDesc = 'peerId_DESC',
  PeerIdDescNullsLast = 'peerId_DESC_NULLS_LAST',
  Queries24HoursAsc = 'queries24Hours_ASC',
  Queries24HoursAscNullsFirst = 'queries24Hours_ASC_NULLS_FIRST',
  Queries24HoursDesc = 'queries24Hours_DESC',
  Queries24HoursDescNullsLast = 'queries24Hours_DESC_NULLS_LAST',
  Queries90DaysAsc = 'queries90Days_ASC',
  Queries90DaysAscNullsFirst = 'queries90Days_ASC_NULLS_FIRST',
  Queries90DaysDesc = 'queries90Days_DESC',
  Queries90DaysDescNullsLast = 'queries90Days_DESC_NULLS_LAST',
  RealOwnerBalanceAsc = 'realOwner_balance_ASC',
  RealOwnerBalanceAscNullsFirst = 'realOwner_balance_ASC_NULLS_FIRST',
  RealOwnerBalanceDesc = 'realOwner_balance_DESC',
  RealOwnerBalanceDescNullsLast = 'realOwner_balance_DESC_NULLS_LAST',
  RealOwnerClaimableDelegationCountAsc = 'realOwner_claimableDelegationCount_ASC',
  RealOwnerClaimableDelegationCountAscNullsFirst = 'realOwner_claimableDelegationCount_ASC_NULLS_FIRST',
  RealOwnerClaimableDelegationCountDesc = 'realOwner_claimableDelegationCount_DESC',
  RealOwnerClaimableDelegationCountDescNullsLast = 'realOwner_claimableDelegationCount_DESC_NULLS_LAST',
  RealOwnerIdAsc = 'realOwner_id_ASC',
  RealOwnerIdAscNullsFirst = 'realOwner_id_ASC_NULLS_FIRST',
  RealOwnerIdDesc = 'realOwner_id_DESC',
  RealOwnerIdDescNullsLast = 'realOwner_id_DESC_NULLS_LAST',
  RealOwnerTypeAsc = 'realOwner_type_ASC',
  RealOwnerTypeAscNullsFirst = 'realOwner_type_ASC_NULLS_FIRST',
  RealOwnerTypeDesc = 'realOwner_type_DESC',
  RealOwnerTypeDescNullsLast = 'realOwner_type_DESC_NULLS_LAST',
  ScannedData24HoursAsc = 'scannedData24Hours_ASC',
  ScannedData24HoursAscNullsFirst = 'scannedData24Hours_ASC_NULLS_FIRST',
  ScannedData24HoursDesc = 'scannedData24Hours_DESC',
  ScannedData24HoursDescNullsLast = 'scannedData24Hours_DESC_NULLS_LAST',
  ScannedData90DaysAsc = 'scannedData90Days_ASC',
  ScannedData90DaysAscNullsFirst = 'scannedData90Days_ASC_NULLS_FIRST',
  ScannedData90DaysDesc = 'scannedData90Days_DESC',
  ScannedData90DaysDescNullsLast = 'scannedData90Days_DESC_NULLS_LAST',
  ServedData24HoursAsc = 'servedData24Hours_ASC',
  ServedData24HoursAscNullsFirst = 'servedData24Hours_ASC_NULLS_FIRST',
  ServedData24HoursDesc = 'servedData24Hours_DESC',
  ServedData24HoursDescNullsLast = 'servedData24Hours_DESC_NULLS_LAST',
  ServedData90DaysAsc = 'servedData90Days_ASC',
  ServedData90DaysAscNullsFirst = 'servedData90Days_ASC_NULLS_FIRST',
  ServedData90DaysDesc = 'servedData90Days_DESC',
  ServedData90DaysDescNullsLast = 'servedData90Days_DESC_NULLS_LAST',
  StakerAprAsc = 'stakerApr_ASC',
  StakerAprAscNullsFirst = 'stakerApr_ASC_NULLS_FIRST',
  StakerAprDesc = 'stakerApr_DESC',
  StakerAprDescNullsLast = 'stakerApr_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  StoredDataAsc = 'storedData_ASC',
  StoredDataAscNullsFirst = 'storedData_ASC_NULLS_FIRST',
  StoredDataDesc = 'storedData_DESC',
  StoredDataDescNullsLast = 'storedData_DESC_NULLS_LAST',
  TotalDelegationAsc = 'totalDelegation_ASC',
  TotalDelegationAscNullsFirst = 'totalDelegation_ASC_NULLS_FIRST',
  TotalDelegationDesc = 'totalDelegation_DESC',
  TotalDelegationDescNullsLast = 'totalDelegation_DESC_NULLS_LAST',
  Uptime24HoursAsc = 'uptime24Hours_ASC',
  Uptime24HoursAscNullsFirst = 'uptime24Hours_ASC_NULLS_FIRST',
  Uptime24HoursDesc = 'uptime24Hours_DESC',
  Uptime24HoursDescNullsLast = 'uptime24Hours_DESC_NULLS_LAST',
  Uptime90DaysAsc = 'uptime90Days_ASC',
  Uptime90DaysAscNullsFirst = 'uptime90Days_ASC_NULLS_FIRST',
  Uptime90DaysDesc = 'uptime90Days_DESC',
  Uptime90DaysDescNullsLast = 'uptime90Days_DESC_NULLS_LAST',
  VersionAsc = 'version_ASC',
  VersionAscNullsFirst = 'version_ASC_NULLS_FIRST',
  VersionDesc = 'version_DESC',
  VersionDescNullsLast = 'version_DESC_NULLS_LAST',
  WebsiteAsc = 'website_ASC',
  WebsiteAscNullsFirst = 'website_ASC_NULLS_FIRST',
  WebsiteDesc = 'website_DESC',
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
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakersRewardAsc = 'stakersReward_ASC',
  StakersRewardAscNullsFirst = 'stakersReward_ASC_NULLS_FIRST',
  StakersRewardDesc = 'stakersReward_DESC',
  StakersRewardDescNullsLast = 'stakersReward_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteDesc = 'worker_website_DESC',
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
  EpochEndDesc = 'epoch_end_DESC',
  EpochEndDescNullsLast = 'epoch_end_DESC_NULLS_LAST',
  EpochEndedAtAsc = 'epoch_endedAt_ASC',
  EpochEndedAtAscNullsFirst = 'epoch_endedAt_ASC_NULLS_FIRST',
  EpochEndedAtDesc = 'epoch_endedAt_DESC',
  EpochEndedAtDescNullsLast = 'epoch_endedAt_DESC_NULLS_LAST',
  EpochIdAsc = 'epoch_id_ASC',
  EpochIdAscNullsFirst = 'epoch_id_ASC_NULLS_FIRST',
  EpochIdDesc = 'epoch_id_DESC',
  EpochIdDescNullsLast = 'epoch_id_DESC_NULLS_LAST',
  EpochNumberAsc = 'epoch_number_ASC',
  EpochNumberAscNullsFirst = 'epoch_number_ASC_NULLS_FIRST',
  EpochNumberDesc = 'epoch_number_DESC',
  EpochNumberDescNullsLast = 'epoch_number_DESC_NULLS_LAST',
  EpochStartAsc = 'epoch_start_ASC',
  EpochStartAscNullsFirst = 'epoch_start_ASC_NULLS_FIRST',
  EpochStartDesc = 'epoch_start_DESC',
  EpochStartDescNullsLast = 'epoch_start_DESC_NULLS_LAST',
  EpochStartedAtAsc = 'epoch_startedAt_ASC',
  EpochStartedAtAscNullsFirst = 'epoch_startedAt_ASC_NULLS_FIRST',
  EpochStartedAtDesc = 'epoch_startedAt_DESC',
  EpochStartedAtDescNullsLast = 'epoch_startedAt_DESC_NULLS_LAST',
  EpochStatusAsc = 'epoch_status_ASC',
  EpochStatusAscNullsFirst = 'epoch_status_ASC_NULLS_FIRST',
  EpochStatusDesc = 'epoch_status_DESC',
  EpochStatusDescNullsLast = 'epoch_status_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UptimeAsc = 'uptime_ASC',
  UptimeAscNullsFirst = 'uptime_ASC_NULLS_FIRST',
  UptimeDesc = 'uptime_DESC',
  UptimeDescNullsLast = 'uptime_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteDesc = 'worker_website_DESC',
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
  Unknow = 'UNKNOW',
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
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PendingAsc = 'pending_ASC',
  PendingAscNullsFirst = 'pending_ASC_NULLS_FIRST',
  PendingDesc = 'pending_DESC',
  PendingDescNullsLast = 'pending_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WorkerAprAsc = 'worker_apr_ASC',
  WorkerAprAscNullsFirst = 'worker_apr_ASC_NULLS_FIRST',
  WorkerAprDesc = 'worker_apr_DESC',
  WorkerAprDescNullsLast = 'worker_apr_DESC_NULLS_LAST',
  WorkerBondAsc = 'worker_bond_ASC',
  WorkerBondAscNullsFirst = 'worker_bond_ASC_NULLS_FIRST',
  WorkerBondDesc = 'worker_bond_DESC',
  WorkerBondDescNullsLast = 'worker_bond_DESC_NULLS_LAST',
  WorkerClaimableRewardAsc = 'worker_claimableReward_ASC',
  WorkerClaimableRewardAscNullsFirst = 'worker_claimableReward_ASC_NULLS_FIRST',
  WorkerClaimableRewardDesc = 'worker_claimableReward_DESC',
  WorkerClaimableRewardDescNullsLast = 'worker_claimableReward_DESC_NULLS_LAST',
  WorkerClaimedRewardAsc = 'worker_claimedReward_ASC',
  WorkerClaimedRewardAscNullsFirst = 'worker_claimedReward_ASC_NULLS_FIRST',
  WorkerClaimedRewardDesc = 'worker_claimedReward_DESC',
  WorkerClaimedRewardDescNullsLast = 'worker_claimedReward_DESC_NULLS_LAST',
  WorkerCreatedAtAsc = 'worker_createdAt_ASC',
  WorkerCreatedAtAscNullsFirst = 'worker_createdAt_ASC_NULLS_FIRST',
  WorkerCreatedAtDesc = 'worker_createdAt_DESC',
  WorkerCreatedAtDescNullsLast = 'worker_createdAt_DESC_NULLS_LAST',
  WorkerDelegationCountAsc = 'worker_delegationCount_ASC',
  WorkerDelegationCountAscNullsFirst = 'worker_delegationCount_ASC_NULLS_FIRST',
  WorkerDelegationCountDesc = 'worker_delegationCount_DESC',
  WorkerDelegationCountDescNullsLast = 'worker_delegationCount_DESC_NULLS_LAST',
  WorkerDescriptionAsc = 'worker_description_ASC',
  WorkerDescriptionAscNullsFirst = 'worker_description_ASC_NULLS_FIRST',
  WorkerDescriptionDesc = 'worker_description_DESC',
  WorkerDescriptionDescNullsLast = 'worker_description_DESC_NULLS_LAST',
  WorkerDialOkAsc = 'worker_dialOk_ASC',
  WorkerDialOkAscNullsFirst = 'worker_dialOk_ASC_NULLS_FIRST',
  WorkerDialOkDesc = 'worker_dialOk_DESC',
  WorkerDialOkDescNullsLast = 'worker_dialOk_DESC_NULLS_LAST',
  WorkerEmailAsc = 'worker_email_ASC',
  WorkerEmailAscNullsFirst = 'worker_email_ASC_NULLS_FIRST',
  WorkerEmailDesc = 'worker_email_DESC',
  WorkerEmailDescNullsLast = 'worker_email_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
  WorkerJailedAsc = 'worker_jailed_ASC',
  WorkerJailedAscNullsFirst = 'worker_jailed_ASC_NULLS_FIRST',
  WorkerJailedDesc = 'worker_jailed_DESC',
  WorkerJailedDescNullsLast = 'worker_jailed_DESC_NULLS_LAST',
  WorkerLockEndAsc = 'worker_lockEnd_ASC',
  WorkerLockEndAscNullsFirst = 'worker_lockEnd_ASC_NULLS_FIRST',
  WorkerLockEndDesc = 'worker_lockEnd_DESC',
  WorkerLockEndDescNullsLast = 'worker_lockEnd_DESC_NULLS_LAST',
  WorkerLockStartAsc = 'worker_lockStart_ASC',
  WorkerLockStartAscNullsFirst = 'worker_lockStart_ASC_NULLS_FIRST',
  WorkerLockStartDesc = 'worker_lockStart_DESC',
  WorkerLockStartDescNullsLast = 'worker_lockStart_DESC_NULLS_LAST',
  WorkerLockedAsc = 'worker_locked_ASC',
  WorkerLockedAscNullsFirst = 'worker_locked_ASC_NULLS_FIRST',
  WorkerLockedDesc = 'worker_locked_DESC',
  WorkerLockedDescNullsLast = 'worker_locked_DESC_NULLS_LAST',
  WorkerNameAsc = 'worker_name_ASC',
  WorkerNameAscNullsFirst = 'worker_name_ASC_NULLS_FIRST',
  WorkerNameDesc = 'worker_name_DESC',
  WorkerNameDescNullsLast = 'worker_name_DESC_NULLS_LAST',
  WorkerOnlineAsc = 'worker_online_ASC',
  WorkerOnlineAscNullsFirst = 'worker_online_ASC_NULLS_FIRST',
  WorkerOnlineDesc = 'worker_online_DESC',
  WorkerOnlineDescNullsLast = 'worker_online_DESC_NULLS_LAST',
  WorkerPeerIdAsc = 'worker_peerId_ASC',
  WorkerPeerIdAscNullsFirst = 'worker_peerId_ASC_NULLS_FIRST',
  WorkerPeerIdDesc = 'worker_peerId_DESC',
  WorkerPeerIdDescNullsLast = 'worker_peerId_DESC_NULLS_LAST',
  WorkerQueries24HoursAsc = 'worker_queries24Hours_ASC',
  WorkerQueries24HoursAscNullsFirst = 'worker_queries24Hours_ASC_NULLS_FIRST',
  WorkerQueries24HoursDesc = 'worker_queries24Hours_DESC',
  WorkerQueries24HoursDescNullsLast = 'worker_queries24Hours_DESC_NULLS_LAST',
  WorkerQueries90DaysAsc = 'worker_queries90Days_ASC',
  WorkerQueries90DaysAscNullsFirst = 'worker_queries90Days_ASC_NULLS_FIRST',
  WorkerQueries90DaysDesc = 'worker_queries90Days_DESC',
  WorkerQueries90DaysDescNullsLast = 'worker_queries90Days_DESC_NULLS_LAST',
  WorkerScannedData24HoursAsc = 'worker_scannedData24Hours_ASC',
  WorkerScannedData24HoursAscNullsFirst = 'worker_scannedData24Hours_ASC_NULLS_FIRST',
  WorkerScannedData24HoursDesc = 'worker_scannedData24Hours_DESC',
  WorkerScannedData24HoursDescNullsLast = 'worker_scannedData24Hours_DESC_NULLS_LAST',
  WorkerScannedData90DaysAsc = 'worker_scannedData90Days_ASC',
  WorkerScannedData90DaysAscNullsFirst = 'worker_scannedData90Days_ASC_NULLS_FIRST',
  WorkerScannedData90DaysDesc = 'worker_scannedData90Days_DESC',
  WorkerScannedData90DaysDescNullsLast = 'worker_scannedData90Days_DESC_NULLS_LAST',
  WorkerServedData24HoursAsc = 'worker_servedData24Hours_ASC',
  WorkerServedData24HoursAscNullsFirst = 'worker_servedData24Hours_ASC_NULLS_FIRST',
  WorkerServedData24HoursDesc = 'worker_servedData24Hours_DESC',
  WorkerServedData24HoursDescNullsLast = 'worker_servedData24Hours_DESC_NULLS_LAST',
  WorkerServedData90DaysAsc = 'worker_servedData90Days_ASC',
  WorkerServedData90DaysAscNullsFirst = 'worker_servedData90Days_ASC_NULLS_FIRST',
  WorkerServedData90DaysDesc = 'worker_servedData90Days_DESC',
  WorkerServedData90DaysDescNullsLast = 'worker_servedData90Days_DESC_NULLS_LAST',
  WorkerStakerAprAsc = 'worker_stakerApr_ASC',
  WorkerStakerAprAscNullsFirst = 'worker_stakerApr_ASC_NULLS_FIRST',
  WorkerStakerAprDesc = 'worker_stakerApr_DESC',
  WorkerStakerAprDescNullsLast = 'worker_stakerApr_DESC_NULLS_LAST',
  WorkerStatusAsc = 'worker_status_ASC',
  WorkerStatusAscNullsFirst = 'worker_status_ASC_NULLS_FIRST',
  WorkerStatusDesc = 'worker_status_DESC',
  WorkerStatusDescNullsLast = 'worker_status_DESC_NULLS_LAST',
  WorkerStoredDataAsc = 'worker_storedData_ASC',
  WorkerStoredDataAscNullsFirst = 'worker_storedData_ASC_NULLS_FIRST',
  WorkerStoredDataDesc = 'worker_storedData_DESC',
  WorkerStoredDataDescNullsLast = 'worker_storedData_DESC_NULLS_LAST',
  WorkerTotalDelegationAsc = 'worker_totalDelegation_ASC',
  WorkerTotalDelegationAscNullsFirst = 'worker_totalDelegation_ASC_NULLS_FIRST',
  WorkerTotalDelegationDesc = 'worker_totalDelegation_DESC',
  WorkerTotalDelegationDescNullsLast = 'worker_totalDelegation_DESC_NULLS_LAST',
  WorkerUptime24HoursAsc = 'worker_uptime24Hours_ASC',
  WorkerUptime24HoursAscNullsFirst = 'worker_uptime24Hours_ASC_NULLS_FIRST',
  WorkerUptime24HoursDesc = 'worker_uptime24Hours_DESC',
  WorkerUptime24HoursDescNullsLast = 'worker_uptime24Hours_DESC_NULLS_LAST',
  WorkerUptime90DaysAsc = 'worker_uptime90Days_ASC',
  WorkerUptime90DaysAscNullsFirst = 'worker_uptime90Days_ASC_NULLS_FIRST',
  WorkerUptime90DaysDesc = 'worker_uptime90Days_DESC',
  WorkerUptime90DaysDescNullsLast = 'worker_uptime90Days_DESC_NULLS_LAST',
  WorkerVersionAsc = 'worker_version_ASC',
  WorkerVersionAscNullsFirst = 'worker_version_ASC_NULLS_FIRST',
  WorkerVersionDesc = 'worker_version_DESC',
  WorkerVersionDescNullsLast = 'worker_version_DESC_NULLS_LAST',
  WorkerWebsiteAsc = 'worker_website_ASC',
  WorkerWebsiteAscNullsFirst = 'worker_website_ASC_NULLS_FIRST',
  WorkerWebsiteDesc = 'worker_website_DESC',
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
  jailed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  jailed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  jailed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
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
  totalDelegation_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalDelegation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
        bondAmount?: any;
        delegationLimitCoefficient: number;
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
    balance: any;
    owned: Array<{ __typename?: 'Account'; id: string; type: AccountType; balance: any }>;
  };
};

export type WorkerFragmentFragment = {
  __typename?: 'Worker';
  id: string;
  name?: string;
  email?: string;
  peerId: string;
  website?: string;
  status: WorkerStatus;
  createdAt: any;
  description?: string;
  bond: any;
  claimableReward: any;
  claimedReward: any;
  uptime24Hours?: number;
  uptime90Days?: number;
  totalDelegation: any;
  delegationCount: number;
  apr?: number;
  stakerApr?: number;
  online?: boolean;
  jailed?: boolean;
  dialOk?: boolean;
  locked?: boolean;
  owner: { __typename?: 'Account'; id: string };
  realOwner: { __typename?: 'Account'; id: string };
};

export type WorkerFullFragmentFragment = {
  __typename?: 'Worker';
  queries24Hours?: any;
  queries90Days?: any;
  scannedData24Hours?: any;
  scannedData90Days?: any;
  servedData24Hours?: any;
  servedData90Days?: any;
  storedData?: any;
  owner: { __typename?: 'Account'; id: string; type: AccountType };
};

export type AllWorkersQueryVariables = Exact<{ [key: string]: never }>;

export type AllWorkersQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    id: string;
    name?: string;
    email?: string;
    peerId: string;
    website?: string;
    status: WorkerStatus;
    createdAt: any;
    description?: string;
    bond: any;
    claimableReward: any;
    claimedReward: any;
    uptime24Hours?: number;
    uptime90Days?: number;
    totalDelegation: any;
    delegationCount: number;
    apr?: number;
    stakerApr?: number;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    locked?: boolean;
    owner: { __typename?: 'Account'; id: string };
    realOwner: { __typename?: 'Account'; id: string };
  }>;
};

export type WorkerByPeerIdQueryVariables = Exact<{
  peerId: Scalars['String']['input'];
  address: Scalars['String']['input'];
}>;

export type WorkerByPeerIdQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    id: string;
    name?: string;
    email?: string;
    peerId: string;
    website?: string;
    status: WorkerStatus;
    createdAt: any;
    description?: string;
    bond: any;
    claimableReward: any;
    claimedReward: any;
    uptime24Hours?: number;
    uptime90Days?: number;
    totalDelegation: any;
    delegationCount: number;
    apr?: number;
    stakerApr?: number;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    locked?: boolean;
    queries24Hours?: any;
    queries90Days?: any;
    scannedData24Hours?: any;
    scannedData90Days?: any;
    servedData24Hours?: any;
    servedData90Days?: any;
    storedData?: any;
    myDelegations: Array<{
      __typename?: 'Delegation';
      deposit: any;
      locked?: boolean;
      owner: { __typename?: 'Account'; id: string; type: AccountType; balance: any };
    }>;
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
  workerSnapshotsByDay: Array<{ __typename?: 'WorkerSnapshotDay'; timestamp: any; uptime: number }>;
};

export type MyWorkersQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyWorkersQuery = {
  __typename?: 'Query';
  workers: Array<{
    __typename?: 'Worker';
    id: string;
    name?: string;
    email?: string;
    peerId: string;
    website?: string;
    status: WorkerStatus;
    createdAt: any;
    description?: string;
    bond: any;
    claimableReward: any;
    claimedReward: any;
    uptime24Hours?: number;
    uptime90Days?: number;
    totalDelegation: any;
    delegationCount: number;
    apr?: number;
    stakerApr?: number;
    online?: boolean;
    jailed?: boolean;
    dialOk?: boolean;
    locked?: boolean;
    myDelegations: Array<{
      __typename?: 'Delegation';
      deposit: any;
      locked?: boolean;
      owner: { __typename?: 'Account'; id: string; type: AccountType; balance: any };
    }>;
    owner: { __typename?: 'Account'; id: string };
    realOwner: { __typename?: 'Account'; id: string };
  }>;
};

export type MyAssetsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyAssetsQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename?: 'Account';
    balance: any;
    owned: Array<{ __typename?: 'Account'; id: string; balance: any }>;
  }>;
  workers: Array<{ __typename?: 'Worker'; bond: any; claimableReward: any }>;
  delegations: Array<{ __typename?: 'Delegation'; claimableReward: any; deposit: any }>;
};

export type MyDelegationsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyDelegationsQuery = {
  __typename?: 'Query';
  delegations: Array<{
    __typename?: 'Delegation';
    claimableReward: any;
    claimedReward: any;
    deposit: any;
    worker: {
      __typename?: 'Worker';
      id: string;
      name?: string;
      email?: string;
      peerId: string;
      website?: string;
      status: WorkerStatus;
      createdAt: any;
      description?: string;
      bond: any;
      claimableReward: any;
      claimedReward: any;
      uptime24Hours?: number;
      uptime90Days?: number;
      totalDelegation: any;
      delegationCount: number;
      apr?: number;
      stakerApr?: number;
      online?: boolean;
      jailed?: boolean;
      dialOk?: boolean;
      locked?: boolean;
      owner: { __typename?: 'Account'; id: string };
      realOwner: { __typename?: 'Account'; id: string };
    };
    owner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
};

export type MyClaimsAvailableQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type MyClaimsAvailableQuery = {
  __typename?: 'Query';
  delegations: Array<{
    __typename?: 'Delegation';
    claimableReward: any;
    deposit: any;
    worker: { __typename?: 'Worker'; id: string; name?: string; peerId: string };
    owner: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
  workers: Array<{
    __typename?: 'Worker';
    id: string;
    name?: string;
    peerId: string;
    claimableReward: any;
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
  createdAt: any;
  operator?: {
    __typename?: 'GatewayOperator';
    autoExtension: boolean;
    stake?: {
      __typename?: 'GatewayStake';
      amount: any;
      locked: boolean;
      lockStart: number;
      lockEnd: number;
    };
    pendingStake?: {
      __typename?: 'GatewayStake';
      amount: any;
      locked: boolean;
      lockStart: number;
      lockEnd: number;
    };
  };
  owner?: { __typename?: 'Account'; id: string; type: AccountType };
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
    createdAt: any;
    operator?: {
      __typename?: 'GatewayOperator';
      autoExtension: boolean;
      stake?: {
        __typename?: 'GatewayStake';
        amount: any;
        locked: boolean;
        lockStart: number;
        lockEnd: number;
      };
      pendingStake?: {
        __typename?: 'GatewayStake';
        amount: any;
        locked: boolean;
        lockStart: number;
        lockEnd: number;
      };
    };
    owner?: { __typename?: 'Account'; id: string; type: AccountType };
  }>;
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
    createdAt: any;
    operator?: {
      __typename?: 'GatewayOperator';
      autoExtension: boolean;
      stake?: {
        __typename?: 'GatewayStake';
        amount: any;
        locked: boolean;
        lockStart: number;
        lockEnd: number;
      };
      pendingStake?: {
        __typename?: 'GatewayStake';
        amount: any;
        locked: boolean;
        lockStart: number;
        lockEnd: number;
      };
    };
    owner?: { __typename?: 'Account'; id: string; type: AccountType };
  };
};

export const WorkerFragmentFragmentDoc = `
    fragment WorkerFragment on Worker {
  id
  name
  email
  peerId
  website
  status
  createdAt
  description
  bond
  claimableReward
  claimedReward
  uptime24Hours
  uptime90Days
  totalDelegation
  delegationCount
  apr
  stakerApr
  online
  jailed
  dialOk
  locked
  owner {
    id
  }
  realOwner {
    id
  }
}
    `;
export const WorkerFullFragmentFragmentDoc = `
    fragment WorkerFullFragment on Worker {
  queries24Hours
  queries90Days
  scannedData24Hours
  scannedData90Days
  servedData24Hours
  servedData90Days
  storedData
  owner {
    id
    type
  }
}
    `;
export const GatewayFragmentFragmentDoc = `
    fragment GatewayFragment on Gateway {
  id
  name
  status
  description
  email
  endpointUrl
  website
  operator {
    autoExtension
    stake {
      amount
      locked
      lockStart
      lockEnd
    }
    pendingStake {
      amount
      locked
      lockStart
      lockEnd
    }
  }
  owner {
    id
    type
  }
  createdAt
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
  workers(where: {status_eq: ACTIVE}) {
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
    query workerByPeerId($peerId: String!, $address: String!) {
  workers(where: {peerId_eq: $peerId}, limit: 1) {
    ...WorkerFragment
    ...WorkerFullFragment
    myDelegations: delegations(where: {realOwner: {id_eq: $address}}) {
      deposit
      locked
      owner {
        id
        type
        balance
      }
    }
  }
}
    ${WorkerFragmentFragmentDoc}
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
  workers(orderBy: id_ASC, where: {realOwner: {id_eq: $address}}) {
    ...WorkerFragment
    myDelegations: delegations(where: {realOwner: {id_eq: $address}}) {
      deposit
      locked
      owner {
        id
        type
        balance
      }
    }
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
    `;

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
    worker {
      ...WorkerFragment
    }
    owner {
      id
      type
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

export const MyClaimsAvailableDocument = `
    query myClaimsAvailable($address: String!) {
  delegations(where: {realOwner: {id_eq: $address}, claimableReward_gt: 0}) {
    claimableReward
    deposit
    worker {
      id
      name
      peerId
    }
    owner {
      id
      type
    }
  }
  workers(where: {realOwner: {id_eq: $address}, claimableReward_gt: 0}) {
    id
    name
    peerId
    claimableReward
    owner {
      id
      type
    }
  }
}
    `;

export const useMyClaimsAvailableQuery = <TData = MyClaimsAvailableQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MyClaimsAvailableQueryVariables,
  options?: Omit<UseQueryOptions<MyClaimsAvailableQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<MyClaimsAvailableQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<MyClaimsAvailableQuery, TError, TData>({
    queryKey: ['myClaimsAvailable', variables],
    queryFn: fetcher<MyClaimsAvailableQuery, MyClaimsAvailableQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MyClaimsAvailableDocument,
      variables,
    ),
    ...options,
  });
};

export const MyGatewaysDocument = `
    query myGateways($address: String!) {
  gateways(
    orderBy: id_ASC
    where: {owner: {id_eq: $address}, status_eq: REGISTERED}
  ) {
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
