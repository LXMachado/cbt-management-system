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

        createMany: procedure.input($Schema.JobStatusInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.createMany(input as any))),

        create: procedure.input($Schema.JobStatusInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.create(input as any))),

        deleteMany: procedure.input($Schema.JobStatusInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.deleteMany(input as any))),

        delete: procedure.input($Schema.JobStatusInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.delete(input as any))),

        findFirst: procedure.input($Schema.JobStatusInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobStatus.findFirst(input as any))),

        findMany: procedure.input($Schema.JobStatusInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobStatus.findMany(input as any))),

        findUnique: procedure.input($Schema.JobStatusInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobStatus.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobStatusInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.updateMany(input as any))),

        update: procedure.input($Schema.JobStatusInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobStatus.update(input as any))),

        count: procedure.input($Schema.JobStatusInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobStatus.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobStatusCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobStatusCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobStatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobStatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobStatusGetPayload<T>, Context>) => Promise<Prisma.JobStatusGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobStatusDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobStatusDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobStatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobStatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobStatusGetPayload<T>, Context>) => Promise<Prisma.JobStatusGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobStatusFindFirstArgs, TData = Prisma.JobStatusGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.JobStatusFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobStatusGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobStatusFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobStatusFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobStatusGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobStatusGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobStatusFindManyArgs, TData = Array<Prisma.JobStatusGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.JobStatusFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobStatusGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobStatusFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobStatusFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobStatusGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobStatusGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobStatusFindUniqueArgs, TData = Prisma.JobStatusGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobStatusFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobStatusGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobStatusFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobStatusFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobStatusGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobStatusGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobStatusUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobStatusUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobStatusUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobStatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobStatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobStatusUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobStatusUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobStatusGetPayload<T>, Context>) => Promise<Prisma.JobStatusGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JobStatusCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobStatusCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.JobStatusCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JobStatusCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JobStatusCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.JobStatusCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JobStatusCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobStatusCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
