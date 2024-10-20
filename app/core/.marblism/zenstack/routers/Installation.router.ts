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

        createMany: procedure.input($Schema.InstallationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.createMany(input as any))),

        create: procedure.input($Schema.InstallationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.create(input as any))),

        deleteMany: procedure.input($Schema.InstallationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.deleteMany(input as any))),

        delete: procedure.input($Schema.InstallationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.delete(input as any))),

        findFirst: procedure.input($Schema.InstallationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).installation.findFirst(input as any))),

        findMany: procedure.input($Schema.InstallationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).installation.findMany(input as any))),

        findUnique: procedure.input($Schema.InstallationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).installation.findUnique(input as any))),

        updateMany: procedure.input($Schema.InstallationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.updateMany(input as any))),

        update: procedure.input($Schema.InstallationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).installation.update(input as any))),

        count: procedure.input($Schema.InstallationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).installation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.InstallationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.InstallationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallationGetPayload<T>, Context>) => Promise<Prisma.InstallationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.InstallationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.InstallationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallationGetPayload<T>, Context>) => Promise<Prisma.InstallationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.InstallationFindFirstArgs, TData = Prisma.InstallationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.InstallationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InstallationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InstallationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InstallationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InstallationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.InstallationFindManyArgs, TData = Array<Prisma.InstallationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.InstallationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.InstallationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InstallationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.InstallationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.InstallationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.InstallationFindUniqueArgs, TData = Prisma.InstallationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InstallationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InstallationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InstallationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InstallationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InstallationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InstallationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.InstallationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.InstallationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InstallationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InstallationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InstallationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InstallationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InstallationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InstallationGetPayload<T>, Context>) => Promise<Prisma.InstallationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.InstallationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InstallationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.InstallationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.InstallationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.InstallationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.InstallationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.InstallationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InstallationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
