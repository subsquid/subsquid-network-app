import { Box, CircularProgress, circularProgressClasses, styled } from '@mui/material';

const WorkerCapacityValue = styled(Box, {
  name: 'WorkerCapacityValue',
})(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.secondary.contrastText,
  lineHeight: 1,
}));

const DelegationCircularProgress = styled(CircularProgress, {
  name: 'DelegationCircularProgress',
})(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  [`& .${circularProgressClasses.circleDeterminate}`]: {
    color: theme.palette.secondary.contrastText,
  },
}));

const DelegationCircularBackground = styled(CircularProgress, {
  name: 'DelegationCircularBackground',
})(() => ({
  [`& .${circularProgressClasses.circleDeterminate}`]: {
    color: '#CBCBCB',
  },
}));

const DelegationCircularHolder = styled(Box, {
  name: 'DelegationCircularHolder',
})(() => ({
  position: 'relative',
  height: 16,
  display: 'flex',
}));

// export const WorkerDelegationCapacity = ({
//   value: { capacity, utilizedPercent, limit, total },
// }: {
//   value: BlockchainApiWorker['totalDelegations'];
// }) => {
//   const popupState = usePopupState({ variant: 'popover', popupId: 'delegation' });
//   const { SQD_TOKEN } = useContracts();

//   return (
//     <Stack spacing={1} direction="row" alignItems="center" {...bindHover(popupState)}>
//       <DelegationCircularHolder>
//         <DelegationCircularBackground size={16} variant="determinate" thickness={6} value={100} />
//         <DelegationCircularProgress
//           size={16}
//           variant="determinate"
//           thickness={6}
//           value={utilizedPercent.toNumber()}
//         />
//       </DelegationCircularHolder>
//       <WorkerCapacityValue
//         sx={{
//           color: utilizedPercent.equals(0) ? 'text.secondary' : undefined,
//         }}
//       >
//         {utilizedPercent.equals(0)
//           ? '0'
//           : utilizedPercent.lessThan(1)
//             ? '<1'
//             : utilizedPercent.toFixed(0)}
//         %
//       </WorkerCapacityValue>
//       <HoverPopover
//         sx={{ marginLeft: 1 }}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         {...bindPopover(popupState)}
//       >
//         <PopoverContent>
//           <PopoverTable>
//             <TableBody>
//               <TableRow>
//                 <TableCell component="th">Delegation capacity</TableCell>
//                 <TableCell align="right">{formatSqd(SQD_TOKEN, capacity)}</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell component="th">Delegated</TableCell>
//                 <TableCell align="right">{formatSqd(SQD_TOKEN, total)}</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell component="th">Delegation limit</TableCell>
//                 <TableCell align="right">{formatSqd(SQD_TOKEN, limit)}</TableCell>
//               </TableRow>
//             </TableBody>
//           </PopoverTable>
//         </PopoverContent>
//       </HoverPopover>
//     </Stack>
//   );
// };
