/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CommunicationLogInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.createMany(input as any))),

        create: procedure.input($Schema.CommunicationLogInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.create(input as any))),

        deleteMany: procedure.input($Schema.CommunicationLogInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.deleteMany(input as any))),

        delete: procedure.input($Schema.CommunicationLogInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.delete(input as any))),

        findFirst: procedure.input($Schema.CommunicationLogInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).communicationLog.findFirst(input as any))),

        findMany: procedure.input($Schema.CommunicationLogInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).communicationLog.findMany(input as any))),

        findUnique: procedure.input($Schema.CommunicationLogInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).communicationLog.findUnique(input as any))),

        updateMany: procedure.input($Schema.CommunicationLogInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.updateMany(input as any))),

        update: procedure.input($Schema.CommunicationLogInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communicationLog.update(input as any))),

        count: procedure.input($Schema.CommunicationLogInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).communicationLog.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CommunicationLogCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CommunicationLogCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunicationLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunicationLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunicationLogGetPayload<T>, Context>) => Promise<Prisma.CommunicationLogGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommunicationLogDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommunicationLogDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunicationLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunicationLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunicationLogGetPayload<T>, Context>) => Promise<Prisma.CommunicationLogGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CommunicationLogFindFirstArgs, TData = Prisma.CommunicationLogGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunicationLogFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunicationLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunicationLogFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunicationLogFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunicationLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunicationLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CommunicationLogFindManyArgs, TData = Array<Prisma.CommunicationLogGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunicationLogFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CommunicationLogGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunicationLogFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunicationLogFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CommunicationLogGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommunicationLogGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommunicationLogFindUniqueArgs, TData = Prisma.CommunicationLogGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CommunicationLogFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunicationLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunicationLogFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommunicationLogFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunicationLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunicationLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CommunicationLogUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CommunicationLogUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunicationLogUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunicationLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunicationLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunicationLogUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunicationLogUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunicationLogGetPayload<T>, Context>) => Promise<Prisma.CommunicationLogGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CommunicationLogCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunicationLogCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CommunicationLogCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CommunicationLogCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CommunicationLogCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CommunicationLogCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CommunicationLogCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunicationLogCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
