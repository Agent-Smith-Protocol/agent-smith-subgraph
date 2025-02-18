import { BigInt } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  DelegateFundsToAgent as DelegateFundsToAgentEvent,
  Deposit as DepositEvent,
  RequestWithdraw as RequestWithdrawEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  UpdatePriceParameters as UpdatePriceParametersEvent,
  UpdateSmithAddress as UpdateSmithAddressEvent,
  UpdateTreasury as UpdateTreasuryEvent,
  UpdateWithdrawFeePercent as UpdateWithdrawFeePercentEvent,
  Withdraw as WithdrawEvent,
  WithdrawApproved as WithdrawApprovedEvent,
  WithdrawRejected as WithdrawRejectedEvent,
} from "../generated/AgentSmithVault/AgentSmithVault";
import {
  Approval,
  DelegateFundsToAgent,
  Deposit,
  RequestWithdraw,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  UpdatePriceParameters,
  UpdateSmithAddress,
  UpdateTreasury,
  UpdateWithdrawFeePercent,
  User,
  Withdraw,
  WithdrawApproved,
  WithdrawRejected,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDelegateFundsToAgent(
  event: DelegateFundsToAgentEvent
): void {
  let entity = new DelegateFundsToAgent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.assets = event.params.assets;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let user = User.load(event.params.owner.toHexString());
  if (user == null) {
    user = new User(event.params.owner.toHexString());
    user.address = event.params.owner;
    user.depositBody = event.params.assets;
    user.shares = event.params.shares;
  } else {
    user.depositBody = user.depositBody.plus(event.params.assets);
    user.shares = user.shares.plus(event.params.shares);
    user.shares = user.shares.plus(event.params.shares);
    user.save();
  }

  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.owner = user.id;
  entity.assets = event.params.assets;
  entity.shares = event.params.shares;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleRequestWithdraw(event: RequestWithdrawEvent): void {
  let user = User.load(event.params.owner.toHexString());
  let entity = new RequestWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  if (user != null) {
    entity.owner = user.id;
  }

  entity.requestId = event.params.requestId;
  entity.sharesAmount = event.params.sharesAmount;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdatePriceParameters(
  event: UpdatePriceParametersEvent
): void {
  let entity = new UpdatePriceParameters(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newTotalAssetsStored = event.params.newTotalAssetsStored;
  entity.newTotalSharesMinted = event.params.newTotalSharesMinted;

  //   shares.mulDiv(
  //     totalAssets() + 1,
  //     crossChainTotalSupply() + 10 ** _decimalsOffset(),
  //     rounding
  // );

  /// BigInt to Int
  entity.sharesPrice = BigInt.fromString("1000000").times(
    event.params.newTotalAssetsStored.div(
      event.params.newTotalSharesMinted.plus(BigInt.fromString("1000000"))
    )
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateSmithAddress(event: UpdateSmithAddressEvent): void {
  let entity = new UpdateSmithAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newAgent = event.params.newAgent;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateTreasury(event: UpdateTreasuryEvent): void {
  let entity = new UpdateTreasury(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newTreasury = event.params.newTreasury;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateWithdrawFeePercent(
  event: UpdateWithdrawFeePercentEvent
): void {
  let entity = new UpdateWithdrawFeePercent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newFee = event.params.newFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
  // entity.owner = event.params.owner;
  entity.assets = event.params.assets;
  entity.shares = event.params.shares;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let user = new User(event.params.owner.toHexString());
  if (user != null) {
    entity.owner = user.id;
    const precission = BigInt.fromString("1000000");
    const percentage = event.params.shares.times(precission).div(user.shares);
    const withdrawedDepositValue = user.depositBody
      .times(percentage)
      .div(precission);

    user.shares = user.shares.minus(event.params.shares);
    user.depositBody = user.depositBody.minus(withdrawedDepositValue);
    user.save();
  }

  entity.save();
}

export function handleWithdrawApproved(event: WithdrawApprovedEvent): void {
  let entity = new WithdrawApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.feeAmount = event.params.feeAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawRejected(event: WithdrawRejectedEvent): void {
  let entity = new WithdrawRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
