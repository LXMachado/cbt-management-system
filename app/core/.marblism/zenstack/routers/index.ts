/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createCustomerRouter from "./Customer.router";
import createProductRouter from "./Product.router";
import createJobStatusRouter from "./JobStatus.router";
import createJobRouter from "./Job.router";
import createCommunicationLogRouter from "./CommunicationLog.router";
import createInstallationRouter from "./Installation.router";
import createJobNoteRouter from "./JobNote.router";
import createJobScheduleRouter from "./JobSchedule.router";
import createJobSheetRouter from "./JobSheet.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as CustomerClientType } from "./Customer.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as JobStatusClientType } from "./JobStatus.router";
import { ClientType as JobClientType } from "./Job.router";
import { ClientType as CommunicationLogClientType } from "./CommunicationLog.router";
import { ClientType as InstallationClientType } from "./Installation.router";
import { ClientType as JobNoteClientType } from "./JobNote.router";
import { ClientType as JobScheduleClientType } from "./JobSchedule.router";
import { ClientType as JobSheetClientType } from "./JobSheet.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        customer: createCustomerRouter(router, procedure),
        product: createProductRouter(router, procedure),
        jobStatus: createJobStatusRouter(router, procedure),
        job: createJobRouter(router, procedure),
        communicationLog: createCommunicationLogRouter(router, procedure),
        installation: createInstallationRouter(router, procedure),
        jobNote: createJobNoteRouter(router, procedure),
        jobSchedule: createJobScheduleRouter(router, procedure),
        jobSheet: createJobSheetRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    customer: CustomerClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    jobStatus: JobStatusClientType<AppRouter>;
    job: JobClientType<AppRouter>;
    communicationLog: CommunicationLogClientType<AppRouter>;
    installation: InstallationClientType<AppRouter>;
    jobNote: JobNoteClientType<AppRouter>;
    jobSchedule: JobScheduleClientType<AppRouter>;
    jobSheet: JobSheetClientType<AppRouter>;
}
