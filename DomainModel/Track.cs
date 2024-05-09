
using System;
using System.Collections.Generic;

namespace DomainModel;

public partial class Track
{
    public int Id { get; set; }

    public int Idtask { get; set; }

    public DateOnly DateTrack { get; set; }

    public int CountHours { get; set; }

    public int Idworker { get; set; }

    public string StatusTask { get; set; } = null!;

    public virtual Task IdtaskNavigation { get; set; } = null!;

    public virtual Worker IdworkerNavigation { get; set; } = null!;
}
