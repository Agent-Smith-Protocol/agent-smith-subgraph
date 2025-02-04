import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  Withdraw,
  WithdrawApproved,
  WithdrawRejected
} from "../generated/AgentSmithVault/AgentSmithVault"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createDelegateFundsToAgentEvent(
  assets: BigInt
): DelegateFundsToAgent {
  let delegateFundsToAgentEvent =
    changetype<DelegateFundsToAgent>(newMockEvent())

  delegateFundsToAgentEvent.parameters = new Array()

  delegateFundsToAgentEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )

  return delegateFundsToAgentEvent
}

export function createDepositEvent(
  sender: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
}

export function createRequestWithdrawEvent(
  owner: Address,
  requestId: BigInt,
  sharesAmount: BigInt,
  timestamp: BigInt
): RequestWithdraw {
  let requestWithdrawEvent = changetype<RequestWithdraw>(newMockEvent())

  requestWithdrawEvent.parameters = new Array()

  requestWithdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  requestWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "sharesAmount",
      ethereum.Value.fromUnsignedBigInt(sharesAmount)
    )
  )
  requestWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return requestWithdrawEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUpdatePriceParametersEvent(
  newTotalAssetsStored: BigInt,
  newTotalSharesMinted: BigInt
): UpdatePriceParameters {
  let updatePriceParametersEvent =
    changetype<UpdatePriceParameters>(newMockEvent())

  updatePriceParametersEvent.parameters = new Array()

  updatePriceParametersEvent.parameters.push(
    new ethereum.EventParam(
      "newTotalAssetsStored",
      ethereum.Value.fromUnsignedBigInt(newTotalAssetsStored)
    )
  )
  updatePriceParametersEvent.parameters.push(
    new ethereum.EventParam(
      "newTotalSharesMinted",
      ethereum.Value.fromUnsignedBigInt(newTotalSharesMinted)
    )
  )

  return updatePriceParametersEvent
}

export function createUpdateSmithAddressEvent(
  newAgent: Address
): UpdateSmithAddress {
  let updateSmithAddressEvent = changetype<UpdateSmithAddress>(newMockEvent())

  updateSmithAddressEvent.parameters = new Array()

  updateSmithAddressEvent.parameters.push(
    new ethereum.EventParam("newAgent", ethereum.Value.fromAddress(newAgent))
  )

  return updateSmithAddressEvent
}

export function createUpdateTreasuryEvent(
  newTreasury: Address
): UpdateTreasury {
  let updateTreasuryEvent = changetype<UpdateTreasury>(newMockEvent())

  updateTreasuryEvent.parameters = new Array()

  updateTreasuryEvent.parameters.push(
    new ethereum.EventParam(
      "newTreasury",
      ethereum.Value.fromAddress(newTreasury)
    )
  )

  return updateTreasuryEvent
}

export function createUpdateWithdrawFeePercentEvent(
  newFee: BigInt
): UpdateWithdrawFeePercent {
  let updateWithdrawFeePercentEvent =
    changetype<UpdateWithdrawFeePercent>(newMockEvent())

  updateWithdrawFeePercentEvent.parameters = new Array()

  updateWithdrawFeePercentEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return updateWithdrawFeePercentEvent
}

export function createWithdrawEvent(
  sender: Address,
  receiver: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}

export function createWithdrawApprovedEvent(
  requestId: BigInt,
  feeAmount: BigInt
): WithdrawApproved {
  let withdrawApprovedEvent = changetype<WithdrawApproved>(newMockEvent())

  withdrawApprovedEvent.parameters = new Array()

  withdrawApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  withdrawApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "feeAmount",
      ethereum.Value.fromUnsignedBigInt(feeAmount)
    )
  )

  return withdrawApprovedEvent
}

export function createWithdrawRejectedEvent(
  requestId: BigInt
): WithdrawRejected {
  let withdrawRejectedEvent = changetype<WithdrawRejected>(newMockEvent())

  withdrawRejectedEvent.parameters = new Array()

  withdrawRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )

  return withdrawRejectedEvent
}
