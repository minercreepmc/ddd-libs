// import { Provider } from '@nestjs/common';
// import { CommandBus } from '@nestjs/cqrs';
// import { DomainEventHandlerClass } from '@domain/domain-events';
//
// export const eventHandlerProviderFactory = (
//   handlersClass: DomainEventHandlerClass[]
// ) => {
//   return handlersClass.map((Handler) => {
//     return {
//       provide: Handler,
//       inject: [CommandBus],
//       useFactory: (commandBus: CommandBus) => {
//         const eventHandler = new Handler(commandBus);
//         eventHandler.listen();
//         return eventHandler;
//       },
//     } as Provider;
//   });
// };
