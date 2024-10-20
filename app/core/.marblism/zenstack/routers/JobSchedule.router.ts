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

        createMany: procedure.input($Schema.JobScheduleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.createMany(input as any))),

        create: procedure.input($Schema.JobScheduleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.create(input as any))),

        deleteMany: procedure.input($Schema.JobScheduleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.deleteMany(input as any))),

        delete: procedure.input($Schema.JobScheduleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.delete(input as any))),

        findFirst: procedure.input($Schema.JobScheduleInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobSchedule.findFirst(input as any))),

        findMany: procedure.input($Schema.JobScheduleInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobSchedule.findMany(input as any))),

        findUnique: procedure.input($Schema.JobScheduleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobSchedule.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobScheduleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.updateMany(input as any))),

        update: procedure.input($Schema.JobScheduleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobSchedule.update(input as any))),

        count: procedure.input($Schema.JobScheduleInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobSchedule.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobScheduleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobScheduleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobScheduleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobScheduleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobScheduleGetPayload<T>, Context>) => Promise<Prisma.JobScheduleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobScheduleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobScheduleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobScheduleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobScheduleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobScheduleGetPayload<T>, Context>) => Promise<Prisma.JobScheduleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobScheduleFindFirstArgs, TData = Prisma.JobScheduleGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.JobScheduleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobScheduleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobScheduleFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobScheduleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobScheduleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobScheduleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobScheduleFindManyArgs, TData = Array<Prisma.JobScheduleGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.JobScheduleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobScheduleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobScheduleFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobScheduleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobScheduleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobScheduleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobScheduleFindUniqueArgs, TData = Prisma.JobScheduleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobScheduleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobScheduleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobScheduleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobScheduleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobScheduleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobScheduleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobScheduleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobScheduleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobScheduleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobScheduleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobScheduleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobScheduleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobScheduleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobScheduleGetPayload<T>, Context>) => Promise<Prisma.JobScheduleGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JobScheduleCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobScheduleCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.JobScheduleCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JobScheduleCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JobScheduleCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.JobScheduleCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JobScheduleCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobScheduleCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
